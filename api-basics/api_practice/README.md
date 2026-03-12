# tasks APIの仕様
## tasks
```json
{
  "id": 1,
  "title": "タスクタイトル",
  "status": "DONE",
  "user_id": 2,
  "createdAt": "2026-02-19T12:00:00Z"
}
```

## users
``` json
{
  "id": 1,
  "name": "Taro",
  "email": "taro@example.com",
  "password": "xxxxxxxxxxxxxxx",
  "createdAt": "2026-02-19T12:00:00Z"
}
```
----

# エンドポイント一覧
## tasks API
```txt
目的	メソッド	パス
一覧	GET	/tasks
詳細	GET	/tasks/:id
作成	POST	/tasks
更新	PUT	/tasks/:id
削除	DELETE	/tasks/:id
```

## Users API
``` txt
一覧	GET	/users
1件取得	GET	/users/:id
作成	POST	/users
更新	PUT	/users/:id
削除	DELETE	/users/:id
```

# レスポンス

## tasks API

### 一覧

``` json
{
  "items": [
    { 
        "id": 1,
        "title": "タスクタイトル",
        "status": "DONE",
        // キャメルケース
        "userId": 2,
        // スネークケース
        // user_id
        "createdAt": "2026-02-19T12:00:00Z"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

## users API

### 一覧
``` json
{
  "items": [
    { "id": 1, "name": "Taro", "email": "taro@example.com", "createdAt": "..." }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```
----

# エラー形式（統一）

- ※失敗はすべてこの形で返します

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "email is required",
    "details": [
      { "field": "email", "reason": "required" }
    ]
  }
}
```

# ステータスコード方針

## HTTPステータスコード一覧

| ケース                     | ステータスコード |
|---------------------------|----------------|
| 一覧取得 / 詳細取得 成功   | 200 |
| 作成成功                   | 201 |
| 更新成功（返すデータあり） | 200 |
| 削除成功（返すデータなし） | 204 |
| 入力ミス                   | 400 |
| 未認証                     | 401 |
| 権限なし                   | 403 |
| 対象なし                   | 404 |
| 想定外エラー               | 500 |

---


# 環境構築

## ①npmの初期化
``` bash
npm init -y
```

## ②依存関係インストール
- ExpressとPrismaClientの導入
``` bash
npm install express @prisma/client
```
## ③開発依存
``` bash
npm install -D prisma typescript ts-node-dev @types/node @types/express
```

## ④TypeScript設定生成
``` bash
npx tsc --init
```
## ⑤Prisma初期化
``` bash
npx prisma init
```

## DBテーブル作成
```bash
CREATE DATABASE テーブル名;
```