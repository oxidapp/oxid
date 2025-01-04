import { Component } from "solid-js";
import TaskList from "~/components/tasks/task-list";
import { useTaskContext } from "~/context/task-context";

const MonthView: Component = () => {
  const { allTasks } = useTaskContext();

  const getAllTasksInCurrentMonth = () =>
    allTasks().filter(
      (task) =>
        task.plannedDoDate &&
        task.plannedDoDate.getMonth() === new Date().getMonth() &&
        task.plannedDoDate.getFullYear() === new Date().getFullYear(),
    );

  return (
    <div>
      <TaskList tasks={getAllTasksInCurrentMonth()} />
    </div>
  );
};

export default MonthView;
