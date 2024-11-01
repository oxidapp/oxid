import { Signal } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";

export function createTaskStore<T>(tasks: T): Signal<T> {
  const [store, setStore] = createStore({
    tasks,
  });

  return [
    () => store.tasks,
    (v: T) => {
      const unwrapped = unwrap(store.tasks);
      typeof v === "function" && (v = v(unwrapped));
      setStore("tasks", reconcile(v));
      return store.tasks;
    },
  ] as Signal<T>;
}
