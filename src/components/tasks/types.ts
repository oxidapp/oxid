export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  dueDate: Date;
  plannedDoDate?: Date;
};
