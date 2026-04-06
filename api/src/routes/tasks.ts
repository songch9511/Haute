import { Router, Request, Response } from "express";
import db from "../db";
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskQuerySchema,
  Task,
} from "../types";
import { ZodError } from "zod";

const router = Router();

function formatZodError(error: ZodError) {
  return error.errors.map((e) => ({
    field: e.path.join("."),
    message: e.message,
  }));
}

// GET /tasks — list with filtering & sorting
router.get("/", (req: Request, res: Response) => {
  const parsed = TaskQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query", details: formatZodError(parsed.error) });
    return;
  }

  const { status, priority, sort, order, limit, offset } = parsed.data;

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }
  if (priority) {
    conditions.push("priority = ?");
    params.push(priority);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT * FROM tasks ${where} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const tasks = db.prepare(sql).all(...params) as Task[];
  const countSql = `SELECT COUNT(*) as total FROM tasks ${where}`;
  const { total } = db.prepare(countSql).get(...params.slice(0, -2)) as { total: number };

  res.json({ data: tasks, total, limit, offset });
});

// GET /tasks/:id
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid task ID" });
    return;
  }

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task | undefined;
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
});

// POST /tasks
router.post("/", (req: Request, res: Response) => {
  const parsed = CreateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: formatZodError(parsed.error) });
    return;
  }

  const { title, description, status, priority, due_date } = parsed.data;

  const result = db
    .prepare(
      `INSERT INTO tasks (title, description, status, priority, due_date)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(title, description ?? null, status, priority, due_date ?? null);

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid) as Task;
  res.status(201).json(task);
});

// PUT /tasks/:id
router.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid task ID" });
    return;
  }

  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task | undefined;
  if (!existing) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  const parsed = UpdateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: formatZodError(parsed.error) });
    return;
  }

  const updates = parsed.data;
  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  const ALLOWED_COLUMNS = ["title", "description", "status", "priority", "due_date"] as const;
  const fields: string[] = [];
  const params: unknown[] = [];

  for (const [key, value] of Object.entries(updates)) {
    if (!(ALLOWED_COLUMNS as readonly string[]).includes(key)) continue;
    fields.push(`${key} = ?`);
    params.push(value ?? null);
  }

  fields.push("updated_at = datetime('now')");
  params.push(id);

  db.prepare(`UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`).run(...params);

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task;
  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid task ID" });
    return;
  }

  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  if (result.changes === 0) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
});

export default router;
