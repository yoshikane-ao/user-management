import { Router } from "express";
import { validationError } from "../lib/error";
import * as service from "./tasks.service";

export const tasksRouter = Router();

tasksRouter.post("/", async (req, res, next) => {
    try {
        //リクエストデータの受け取り
        const body = (req.body ?? {}) as {
            title?: string;
            done?: boolean;
            userId?: number;
        };

        //リクエストデータを分割代入
        const { title, done, userId } = body;

        //バリデーション処理（email重複確認と必須項目入力チェック等）

        // if (users.some((u) => u.email === email)) {
        // return res.status(400).json(validationError("このメールアドレスは既に登録されています。"))};

        if ( !title || !done === undefined || !userId) {
            return res.status(400).json(validationError("全ての項目を入力してください。")
        )};

        //バリデーションが終わったら、
        //const result = usersサービス.register関数を呼び出す。
        const result = await service.create({
            title: title as string,
            done: done as boolean,
            userId: userId as number
        });

        res.status(201).json(result);

        //res.status(201). json(result);
    } catch (error) {
        next(error);

    }
});

tasksRouter.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const tasks = await service.deleteTask(id);
        res.status(200).json(tasks);

    } catch (error) {
        next(error);
    }
});


tasksRouter.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const body = (req.body ?? {}) as {
            title?: string;
            done?: boolean;
            userId?: number;
        };
        const result = await service.updateById(id, body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});