import mongoose from "mongoose";

export const mongoDb = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "ToDoApp",
    })
    .then(() => console.log("Databse connected"))
    .catch((e) => console.log(e));
