import { Component, For, mergeProps, Show } from "solid-js";
import { Task } from "./types";
import RemoveTaskButton from "./remove-task-button";
import { useTaskContext } from "~/context/task-context";
import { Card, CardContent, CardHeader } from "../ui/card";

type TaskListProps = {
  tasks: Task[];
  isEditable?: boolean;
  onTaskDblClick?: (task: Task) => void;
};

const TaskList: Component<TaskListProps> = (props) => {
  props = mergeProps({ isEditable: true }, props);

  const { toggleTask } = useTaskContext();

  const onIsCompletedChange = async (id: number) => {
    toggleTask(id);
  };

  return (
    <Card>
      <CardHeader>
        total: {props.tasks.length} | done:{" "}
        {props.tasks.filter((t) => t.isCompleted).length}
      </CardHeader>

      <CardContent class="grid gap-2">
        <div class="space-y-2">
          <For each={props.tasks}>
            {(task) => (
              <div
                class="flex w-full justify-between gap-8"
                onDblClick={() => props.onTaskDblClick?.(task)}
              >
                <label
                  class={"flex items-center justify-between gap-2"}
                  classList={{ "line-through": task.isCompleted }}
                >
                  <Show when={props.isEditable}>
                    <input
                      type="checkbox"
                      name={task.title}
                      id={task.id.toString()}
                      value={task.title}
                      checked={task.isCompleted}
                      onChange={() => onIsCompletedChange(task.id)}
                    />
                  </Show>
                  <div>{task.title}</div>
                  <div>due: {task.dueDate.toLocaleDateString("hu-HU")}</div>
                  <Show when={task.plannedDoDate} keyed>
                    {(plannedDoDate) => (
                      <div>
                        planned: {plannedDoDate.toLocaleDateString("hu-HU")}
                      </div>
                    )}
                  </Show>
                </label>

                <Show when={props.isEditable}>
                  <RemoveTaskButton id={task.id} />
                </Show>
              </div>
            )}
          </For>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
