import Task from "./task.interface";

export interface Employee {
  id: number;
  name: string;
  title: string;
  tasks: Task[];
}
