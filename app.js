import express from "express";
import { mongoDb } from "./data/connection.js";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();

config({
  path: "./data/config.env",
});

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://to-do-app-react-iota.vercel.app/",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type, Authorization",
  })
);

//Database connection
mongoDb();

//using routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

app.use(ErrorMiddleware);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is listening ....");
});
