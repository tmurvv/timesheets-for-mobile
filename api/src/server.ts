import "dotenv/config";
import express from "express";
import {isEmpty} from "lodash";
import mongoose from "mongoose";

import {authRouter, timesheetRouter} from "./routes/";

export const createServer = async () => {
    const app = express();
    const database: string = process.env.DATABASE_STAGING || "";
    const databasePassword: string = process.env.DATABASE_PASSWORD || "";
    const environment: string = process.env.NODE_ENV || "";

    app.get("/health", (req, res, next) => {
        res.send("Health Status: SUCCESS!!");
    });

    app.use(authRouter);
    app.use(timesheetRouter);

    let DB = database.replace(
        '<PASSWORD>',
        databasePassword
    );

    await mongoose
        .connect(DB, {})
        .then(() => console.log(`DB connection successful. Environment: ${environment}, DB: ${database}`))
        .catch(() => console.log(`DB NOT CONNECTING. PLEASE CHECK NETWORK. Environment: ${environment}, DB: ${database} `));

    return app;
}
