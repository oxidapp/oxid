import { Task } from "~/components/tasks/types";
import { db } from "./db";

export async function getAllTasks() {
  return await db.tasks.toArray();
}

export async function generate5000Tasks() {
  const tasks: Task[] = [];
  
  const latestTaskId = await db.tasks.count();
  
  for (let i = 0; i < 5000; i++) {
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
