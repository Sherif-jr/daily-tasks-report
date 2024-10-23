import Task from "./task.interface";

export interface EmployeeInput {
  name: string;
  title: string;
}
export interface Employee extends EmployeeInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface EmployeeWithTasks extends Employee {
  tasks: Task[];
}
