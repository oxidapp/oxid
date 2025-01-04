import { Task } from "~/components/tasks/types";
import { db } from "./db";

export async function getAllTasks() {
  return await db.tasks.toArray();
}

export async function generateTasks(numberOfTasks: number) {
  const tasks: Task[] = [];

  const latestTaskId = await db.tasks.count();

  for (let i = 0; i < numberOfTasks; i++) {
    tasks.push({
      id: latestTaskId + i,
      title: `Task ${i}`,
      isCompleted: false,
      createdAt: new Date(),
      dueDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
    });
  }

  await db.tasks.bulkAdd(tasks);
}

export async function deleteAllTasks() {
  await db.tasks.clear();
}
export async function getTasksWithPlannedDoDate() {
  return await db.tasks.filter((task) => Boolean(task.plannedDoDate)).toArray();
}

export async function getTasksInBacklog() {
  return await db.tasks
    .filter((task) => !task.plannedDoDate && !task.isCompleted)
    .toArray();
}

export async function updateTask(id: number, task: Partial<Task>) {
  await db.tasks.update(id, task);
}
