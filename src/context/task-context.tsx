import { InsertType } from "dexie";
import {
  createContext,
  createResource,
  InitializedResource,
  ParentComponent,
  useContext,
} from "solid-js";
import { Task } from "~/components/tasks/types";
import { db } from "~/lib/db";
import { getAllTasks } from "~/lib/tasks";

type TaskContext = {
  allTasks: InitializedResource<Task[]>;
  mutate: (fn: (tasks: Task[]) => Task[]) => Task[];
  refetch: (info?: unknown) => Task[] | Promise<Task[]> | undefined | null;
  addTask: (task: InsertType<Task, "id">) => Promise<number>;
  removeTask: (id: number) => Promise<Task[]>;
  toggleTask: (id: number) => Promise<number>;
};

const TaskContext = createContext<TaskContext>();

export const TaskProvider: ParentComponent = (props) => {
  const [allTasks, { mutate, refetch }] = createResource<Task[]>(getAllTasks, {
    initialValue: [],
  });

  const addTask = async (task: InsertType<Task, "id">) => {
    const id = await db.tasks.add(task);
    mutate((tasks) => [...tasks, { ...task, id }]);

    return id;
  };

  const removeTask = async (id: number) => {
    const tasks = mutate<Task[]>((tasks) =>
      tasks.filter((task) => task.id !== id),
    );
    await db.tasks.delete(id);
    return tasks;
  };

  const toggleTask = async (id: number) => {
    mutate<Task[]>((tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
    const updatedTaskId = await db.tasks.update(id, {
      isCompleted: !(await db.tasks.get(id))?.isCompleted,
    });

    return updatedTaskId;
  };

  return (
    <TaskContext.Provider
      value={{
        allTasks,
        mutate,
        refetch,
        addTask,
        removeTask,
        toggleTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext: cannot find a TaskContext");
  }
  return context;
}
