import { Component, For } from "solid-js";
import { Task } from "./types";
import RemoveTaskButton from "./remove-task-button";
import { useTaskContext } from "~/context/task-context";
import { Card, CardContent, CardHeader } from "../ui/card";

type TaskListProps = {
  tasks: Task[];
};

const TaskList: Component<TaskListProps> = (props) => {
  const { toggleTask } = useTaskContext();

  const onIsCompletedChange = async (id: number) => {
    toggleTask(id);
  };

  return (
    <Card>
      <CardHeader>
        total: {props.tasks.length}
        {' '} |
        done: {props.tasks.filter((t) => t.isCompleted).length}
      </CardHeader>
      <CardContent class="grid gap-2">
        <div class="space-y-2 p-4">
          <For each={props.tasks}>
            {(task) => (
              <div class="flex w-full justify-between gap-8">
                <label
                  class={"flex items-center justify-between gap-2"}
                  classList={{ "line-through": task.isCompleted }}
                >
                  <input
                    type="checkbox"
                    name={task.title}
                    id={task.id.toString()}
                    value={task.title}
                    checked={task.isCompleted}
                    onChange={() => onIsCompletedChange(task.id)}
                  />
                  <div>{task.title}</div>
                  <div>{task.dueDate.toLocaleDateString("hu-HU")}</div>
                </label>
                <RemoveTaskButton id={task.id} />
              </div>
            )}
          </For>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
