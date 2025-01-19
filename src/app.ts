import express from "express";
import router from "./routes/index";
import {requestLogger} from "./middlewares/requestLogger";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use(requestLogger);

  app.use("/api", router);

  return app
}
