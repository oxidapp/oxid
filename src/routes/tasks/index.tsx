import { Component } from "solid-js";
import TaskList from "~/components/tasks/task-list";
import { Button } from "~/components/ui/button";
import { useTaskContext } from "~/context/task-context";
import { deleteAllTasks, generateTasks } from "~/lib/tasks";

const TasksPage: Component = () => {
  const { allTasks, refetch } = useTaskContext();

  const onGenerateClick = async (numberOfTasks: number) => {
    await generateTasks(numberOfTasks);
    refetch();
  };

  const onDeleteAllClick = async () => {
    await deleteAllTasks();
    refetch();
  };

  return (
    <div class="container py-4">
      <div class="space-y-2">
        <div class="flex items-end justify-between gap-4 md:justify-start">
          <h1 class="text-5xl font-bold">Tasks</h1>

          <Button
            class="col-span-3"
            type="text"
            variant={"secondary"}
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "n",
                  metaKey: true,
                }),
              )
            }
          >
            add task
          </Button>

          <Button variant={"secondary"} onclick={() => onGenerateClick(5000)}>
            generate 5000 tasks
          </Button>
          <Button variant={"secondary"} onclick={() => onGenerateClick(10)}>
            generate 10 tasks
          </Button>
          <Button variant={"destructive"} onclick={onDeleteAllClick}>
            delete all tasks
          </Button>
        </div>

        {allTasks.loading && <p>Loading...</p>}
        {allTasks.error && <p>Error: {allTasks.error.message}</p>}

        <TaskList tasks={allTasks()} />
      </div>
    </div>
  );
};

export default TasksPage;
