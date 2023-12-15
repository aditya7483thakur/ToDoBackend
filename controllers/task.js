import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const added = await Task.create({ title, description, user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Task added",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });

    if (!task) {
      return next(new ErrorHandler("Invalid Id", 404));
    }

    await task.deleteOne();
    res.send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};
