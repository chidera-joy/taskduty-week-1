import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  category: z.string().trim().min(1),
  completed: z.boolean(),
});

const updateTaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  category: z.string().trim().min(1),
  completed: z.boolean(),
});

const taskIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid task ID");

export { createTaskSchema, updateTaskSchema, taskIdSchema };
