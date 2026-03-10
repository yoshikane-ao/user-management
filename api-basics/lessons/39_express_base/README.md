```JSON
# 【リソース（名詞）を決める（例：users）】
id　主キー
users　ユーザーテーブル
name　名前
email　メールアドレス
createdAt　作成日時
birthday　生年月日

# 【1件の形（データモデル）を決める】
```json
{
    "id": 1,
    "name": "Taro",
    "email": "taro@example.com",
    "createdAt": "2026-02-19T12:00:00Z",
    "birthday": "1999-06-22"
}
```

# 【CRUDのエンドポイントを並べる】
目的:メソッド:パス
一覧 : GET : /users
一見取得 : GET : /users/:id
作成 : POST : users
更新 : PUT : users/:id
削除 : DELETE : users/.id

# 【成功レスポンスのJSON例を書く（一覧/詳細）】
```json
{
    "items": [
        { "id": 1, "name": "Taro", "email": "taro@example.com", "createdAt": "...",
        "birthday": "..."}
    ],
    "page": 1,
    "limit": 20,
    "total": 1
}
```
# 【入力バリデーションとエラー形式を決める】
```json
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "name is required",
        "datails": [
            { "field": "email", "reason": "required"}
        ]
    }
}
```

# 【ステータスコードを決める】
ケース
一覧/詳細取得成功　200
作戦成功　201
更新成功（返すデータあり）　200
削除成功（返すデータなし）　204
入力ミス　400
未認証　401
権限なし　403
対象なし　404
想定外　500


# userAPI仕様表
仕様    実装ファイル    備考
一覧    users.ts       queryパラメーターがある場合は一致するデータに絞り込む。
詳細    users.ts       idに一致するuserを返却。存在しない場合は404
新規登録users.ts       emailアドレスの重複チェック。すでにemailが存在する場合は400
更新    users.ts       emailアドレスの重複チェック。すでにemailが存在する場合は400
削除    users.ts       idに一致するuserを削除。存在しない場合は404
