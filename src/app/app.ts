import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import routeNotFoundHandler from "./middlewares/routeNotFoundHandler";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://10.10.10.17:3000",
      "https://taskflow-frontend-umber.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.send({
    message: "Welcome to TaskFlow server 🛢️!",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(routeNotFoundHandler);

export default app;
