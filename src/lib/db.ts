import Dexie, { type EntityTable } from "dexie";
import { Task } from "~/components/tasks/types";

export const db = new Dexie("TasksDatabase") as Dexie & {
  tasks: EntityTable<
    Task,
    "id" // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  tasks: "++id plannedDoDate",
});
