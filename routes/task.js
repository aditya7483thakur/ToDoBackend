import express from "express";
import {
  addTask,
  deleteTask,
  getMyTasks,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addTask", isAuthenticated, addTask);
router.delete("/deleteTask/:id", isAuthenticated, deleteTask);
router.put("/updateTask/:id", isAuthenticated, updateTask);
router.get("/getMyTasks", isAuthenticated, getMyTasks);

export default router;
