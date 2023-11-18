import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

import { authRouter, timesheetRouter, userRouter } from "./routes/";

export const createServer = async () => {
  const app = express();

  app.use(helmet());

  // Static files middleware
  // app.use(express.static(config.root + '/public'));

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.get("/health", (req, res) => {
    res.send("Health Status: SUCCESS!!");
  });

  app.use(authRouter);
  app.use(timesheetRouter);
  app.use(userRouter);

  return app;
};
