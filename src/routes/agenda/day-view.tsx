import { Component } from "solid-js";
import TaskList from "~/components/tasks/task-list";
import { useTaskContext } from "~/context/task-context";

const DayView: Component = () => {
  const { allTasks } = useTaskContext();

  const getTodayTasks = () =>
    allTasks().filter(
      (task) =>
        task.plannedDoDate &&
        task.plannedDoDate.getDate() === new Date().getDate(),
    );

  return (
    <div>
      <TaskList tasks={getTodayTasks()} />
    </div>
  );
};

export default DayView;
