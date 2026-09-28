import "dotenv/config";
import express, { type Application } from "express";
import connectDB from "./config/DB.js";
import { Task } from "./models/Task.js";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from "./validation/taskValidation.js";
import cors from "cors";

const app: Application = express();
connectDB();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(express.json());
app.post("/tasks", async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  console.log(date);
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task data",
      errors: result.error.issues,
    });
  }
  const data = result.data;
  try {
    const newTask = await Task.create({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      category: data.category,
      completed: data.completed,
    });
    console.log(newTask);
    res.status(201).json({
      message: "Task received",
      task: newTask,
    });
  } catch (error) {
    console.error("Failed to create task:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    const task = await Task.findById(idResult.data);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Failed to fetch task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task data",
        errors: result.error.issues,
      });
    }

    const data = result.data;

    const task = await Task.findById(idResult.data);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const date = new Date().toISOString().slice(0, 10);

    // if (data.dueDate < date) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Date incorrect",
    //   });
    // }

    task.title = data.title;
    task.description = data.description;
    task.dueDate = data.dueDate;
    task.category = data.category;
    task.completed = data.completed;

    await task.save();

    return res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Failed to update task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const idResult = taskIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
        errors: idResult.error.issues,
      });
    }

    const task = await Task.findById(idResult.data);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(idResult.data);

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete task:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from my express server");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});