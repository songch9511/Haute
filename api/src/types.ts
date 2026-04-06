import { z } from "zod";

export const TaskStatus = z.enum(["pending", "in_progress", "completed"]);
export const TaskPriority = z.enum(["low", "medium", "high"]);

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  status: TaskStatus.default("pending"),
  priority: TaskPriority.default("medium"),
  due_date: z.string().datetime().optional(),
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

export const TaskQuerySchema = z.object({
  status: TaskStatus.optional(),
  priority: TaskPriority.optional(),
  sort: z.enum(["created_at", "due_date", "priority"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: z.infer<typeof TaskStatus>;
  priority: z.infer<typeof TaskPriority>;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}
