import express, {} from "express";

import {login, signup} from "./routes/auth";

export default function createServer() {
    const app = express();

    app.get("/", (req, res, next) => {
        res.send("hello world");
    });

    app.post("/auth/login", login)
    app.post("/auth/signup", signup);

    return app;
}

createServer();
