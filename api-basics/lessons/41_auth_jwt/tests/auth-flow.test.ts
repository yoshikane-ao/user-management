import request from "supertest";
import { buildApp } from "../src/app";
import { seedUsers } from "../src/users/users.seed";

async function login(app: any, email: string, password: string) {
  return request(app).post("/auth/login").send({ email, password });
}

describe("auth flow", () => {
  beforeAll(async () => {
    await seedUsers();
  });

  test("login -> me", async () => {
    const app = buildApp();

    const loginRes = await login(app, "taro3@example.com", "passw0rd");
    expect(loginRes.status).toBe(200);

    const token = loginRes.body.token as string;

    const meRes = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(meRes.status).toBe(200);
  });

  test("admin route as user -> 403", async () => {
    const app = buildApp();

    const loginRes = await login(app, "taro3@example.com", "passw0rd");
    expect(loginRes.status).toBe(200); // ここも入れておくと原因が分かりやすい

    const token = loginRes.body.token as string;

    const res = await request(app)
      .get("/users/admin/secret")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });
});