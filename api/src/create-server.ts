import "dotenv/config";
import express from "express";

import {authRouter, timesheetRouter} from "./routes/";

export const createServer = async () => {
    const app = express();

    app.get("/health", (req, res, next) => {
        res.send("Health Status: SUCCESS!!");
    });

    app.use(authRouter);
    app.use(timesheetRouter);

    return app;
}
