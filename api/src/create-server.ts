import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { authRouter, timesheetRouter, userRouter } from "./routes/";

export const createServer = async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  
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
