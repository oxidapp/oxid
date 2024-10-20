import { db } from './db';

export async function getAllTasks() {
  return await db.tasks.toArray();
}