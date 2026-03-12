import express, { Request, Response } from "express";


async function main() {
    const app = express();

    app.use(express.json());


    app.listen( () => {
        console.log("サーバーが動きました");
    });
}
main();








