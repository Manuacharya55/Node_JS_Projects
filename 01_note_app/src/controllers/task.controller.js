import { Task } from "../models/task.model.js";
import { AppError } from "../utils/AppError.js";

const getTask = async (req, res) => {
  const allTask = await Task.find();
  res.render("index", { allTask });
};

const addTask = async (req, res) => {
  const { task } = req.body;

  if (!task) {
    throw new AppError(400, "please name your task");
  }
  const createdtask = await Task.create({ name: task });
  res.status(200).redirect("/api/v1/task");
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw new AppError(400, "No such task");
  }
  res.render("edit",{task})
};

const updatedTask = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const task = await Task.findById(id);

  if (!task) {
    throw new AppError(400, "No such task");
  }

  const newTask = await Task.findByIdAndUpdate(
    id,
    {
      name: name,
    },
    { new: true }
  );

  res.status(200).redirect("/api/v1/task/");
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    throw new AppError(400, "No such tasks");
  }

  const deletedTask = await Task.findByIdAndDelete(id);

  res.status(200).redirect("/api/v1/task/");
};

export { getTask, addTask, updateTask,updatedTask, deleteTask };
