import { Component } from 'solid-js';
import TaskList from '~/components/tasks/task-list';
import { useTaskContext } from '~/context/task-context';

const WeekView : Component = () => {
  const { allTasks } = useTaskContext();


  const getAllTasksThisWeek = () =>
    allTasks().filter(
      (task) =>
        task.plannedDoDate &&
        task.plannedDoDate.getDate() >= new Date().getDate() - 7 &&
        task.plannedDoDate.getDate() <= new Date().getDate(),
    );

  return (
    <div>
      <TaskList tasks={getAllTasksThisWeek()} />
    </div>
  );
};


export default WeekView;