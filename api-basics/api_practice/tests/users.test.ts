import { buildApp } from "../src/app";
import { config } from "../src/config";
import request from "supertest";

describe("auth flow", () => {
  // beforeAll(async () => {
  //   await seedUsers();
  // });

const app = buildApp();
app.listen(config.port, () => {
  console.log(`listening on http://localhost:NULL`);
});

async function register(app: any, name:string, email: string, password: string) {
    return request(app).post("/users/register").send({name, email, password});
}

test("register => delete", async () => {
    const app = buildApp();

    const register_success = await register(app, "taro7", "taro7@example.com", "pass0rd");
    expect(register_success.status).toBe(200);
})


async function registerf(app: any, name:string, email: string, password: string) {
    return request(app).post("/users/register").send({name, email, password});
}

test("register", async () => {
    const app = buildApp();})

    const register_false = await registerf(app, "Taro8", "taro8@example.com", "pass0rd");
    expect(register_false.status).toBe(400);


async function login(app: any, email: string, password: string) {
return request(app).post("/auth/login").send({ email, password });
}
  test("login", async () => {
    const app = buildApp();

    const loginRes = await login(app, "taro7@example.com", "passw0rd");
    expect(loginRes.status).toBe(200);
  });
});