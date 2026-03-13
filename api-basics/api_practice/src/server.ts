import express, { Request, Response } from "express";
import { config } from "./config"
// import { authRouter } from "./auth/auth.routes"
import { usersRouter } from "./users/users.routes"
import { authRouter } from "./auth/auth.routes";
import { tasksRouter } from "./tasks/tasks.routes";

import { buildApp } from "./app";

const app = buildApp();
app.listen(config.port, () => {
  console.log(`listening on http://localhost:NULL`);
});

async function main() {
    const app = express();
    const port = config.port

    app.use(express.json());

    app.use("/auth", authRouter);

    // app.use("/auth", authRouter);
    app.use("/users", usersRouter);

    app.use("/tasks", tasksRouter);

    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`);
    });
}
main();