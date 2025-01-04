import { Component, createSignal, Show } from "solid-js";
import TaskList from "~/components/tasks/task-list";
import { Task } from "~/components/tasks/types";
import UpdatedPlannedDoDate from "~/components/tasks/add-to-agenda-dialog";
import { useTaskContext } from "~/context/task-context";

const Backlog: Component<{ selectedTab: string }> = (props) => {
  const { allTasks } = useTaskContext();

  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedTask, setSelectedTask] = createSignal<Task | undefined>();

  return (
    <>
      <div class="row-span-3 grid grid-rows-subgrid">
        <div class="row-span-2">
          <h1 class="text-5xl font-bold">Backlog</h1>
          <p class="text-muted-foreground">
            Double click to update planned do date.
          </p>
        </div>

        <div class="">
          <TaskList
            tasks={allTasks().filter((task) => !task.plannedDoDate)}
            isEditable={false}
            onTaskDblClick={(task) => {
              setSelectedTask(task);
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      <Show when={isOpen() && selectedTask()} keyed>
        {(selectedTask) => (
          <UpdatedPlannedDoDate
            task={selectedTask}
            isOpen={isOpen()}
            setIsOpen={setIsOpen}
          />
        )}
      </Show>
    </>
  );
};

export default Backlog;
