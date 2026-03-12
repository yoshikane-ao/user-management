import { Router } from "express";
import { validationError } from "../lib/error";
import * as service from "./users.service";

export const usersRouter = Router();

usersRouter.post("/register", async (req, res, next) => {
    try {
        //リクエストデータの受け取り
        const body = (req.body ?? {}) as {
            name?: string;
            email?: string;
            password?: string;
        };

        //リクエストデータを分割代入
        const { name, email, password } = body;

        //バリデーション処理（email重複確認と必須項目入力チェック等）

        // if (users.some((u) => u.email === email)) {
        // return res.status(400).json(validationError("このメールアドレスは既に登録されています。"))};

        if ( !name || !email || !password) {
            return res.status(400).json(validationError("全ての項目を入力してください。")
        )};

        //バリデーションが終わったら、
        //const result = usersサービス.register関数を呼び出す。
        const result = await service.register({name, email, password});

        res.status(201).json(result);

        //res.status(201). json(result);
    } catch (error) {
        next(error);

    }
});




//バリデーションするためには指定したエンドポイントからリクエストをもらう必要がある
