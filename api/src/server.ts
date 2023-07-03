import express from "express";

import { authRouter, timesheetRouter } from "./routes/";

export default function createServer() {
  const app = express();

  app.get("/health", (req, res, next) => {
    res.send("Health Status: SUCCESS!!");
  });

  app.use(authRouter);
  app.use(timesheetRouter);

  return app;
}

createServer();
