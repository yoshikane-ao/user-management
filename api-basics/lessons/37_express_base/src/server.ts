import express, { Request, Response } from "express";
import { logInfo, logError } from "./lib/logger";
import { config } from "./lib/config";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = config.port;

// JSONを受け取れるようにする（POST/PUTで必要）
app.use(express.json());

// ヘルスチェック（稼働確認）
app.get("/health", (_req: Request, res: Response) => {
  throw new Error("boom")
  // res.status(200).json({ status: "ok" });
});

app.use(cors({ origin: config.corsOrigin }));

app.use((req, _res, next) => {
  logInfo("request", { method: req.method, path: req.path });
  next();
});

// ダミーデータ
type User = { id: number; name: string };
const users: User[] = [
  { id: 1, name: "Taro" },
  { id: 2, name: "Hanako" },
];

//演習1：1件取得を追加
app.get("/users/:id", (_req: Request, res: Response) => {

    const id = Number(_req.params.id);
    const user = users.find((u) => u.id === id);
    if(!user) {
        return res.status(404).json({message: "ユーザーはいません。"})
    } else {
        res.status(200).json({items: user});
    }
});

//演習2：POSTで追加（ダミーでOK）
// curl -Method POST http://localhost:3000/users -Headers @{"Content-Type" = "application/json" } -Body '{"name":"Jiro"}'
app.post("/users", (_req: Request, res: Response) => {
    const { name } = _req.body;

    if (!name) {
        return res.status(400).json({ message: "name is required "});
    }

    const newUser: User = {
        id: users.length + 1,
        name,
    };

    users.push(newUser);

    res.status(201).json({ item: newUser });
});

// 一覧
app.get("/users", (_req: Request, res: Response) => {
  res.status(200).json({ items: users });
});

app.use((err: unknown, _req: Request, res: Response, _next: unknown) => {
  logError("unexpected error", { err: String(err) });
  res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "unexpected error" },
  });
});

app.listen(config.port, () => {
  console.log(`Server running: http://localhost:4000`);
});