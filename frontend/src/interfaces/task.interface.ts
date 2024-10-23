import { Employee } from "./employee.interface";

interface Task {
  _id: string;
  title: string;
  description: string;
  from: string;
  to: string;
  employee?: Omit<Employee, "tasks">;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
export default Task;

export interface TaskInput {
  title: string;
  description: string;
  from: string;
  to: string;
  employee: string;
}
