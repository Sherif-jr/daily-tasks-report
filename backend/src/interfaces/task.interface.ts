import { Employee } from "./employee.interface";

interface Task {
  id: string;
  title: string;
  description: string;
  from: Date;
  to: Date;
  employee?: Employee;
}
export default Task;
