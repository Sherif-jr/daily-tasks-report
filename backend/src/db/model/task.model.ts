import { Schema, model } from "mongoose";
import Task from "../../interfaces/task.interface";
import EmployeeModel from "./employee.model";

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const calculateHours = (from: Date, to: Date) => {
  const diffMs = to.getTime() - from.getTime();
  return diffMs / (1000 * 60 * 60);
};

taskSchema.pre("save", async function (next) {
  const employeeExists = await EmployeeModel.exists({ _id: this.employee });

  if (!employeeExists) {
    return next(new Error("Invalid employee ID: Employee does not exist"));
  }

  const newTask = this;

  // Check if the task times are valid (to must be greater than from)
  const taskDuration = calculateHours(newTask.from, newTask.to);
  if (taskDuration <= 0) {
    return next(new Error("Invalid task duration: 'to' must be after 'from'"));
  }

  // Get the day the task is scheduled (ignoring the time part)
  const taskDayStart = new Date(newTask.from);
  taskDayStart.setHours(0, 0, 0, 0); // Start of the day
  const taskDayEnd = new Date(newTask.from);
  taskDayEnd.setHours(23, 59, 59, 999); // End of the day

  // Find all tasks for the same employee on the same day
  const tasksForTheDay = await TaskModel.find({
    employee: newTask.employee,
    from: { $gte: taskDayStart },
    to: { $lte: taskDayEnd },
  });

  const totalHoursForTheDay = tasksForTheDay.reduce((total, task) => {
    return total + calculateHours(task.from, task.to);
  }, 0);

  const totalHoursWithNewTask = totalHoursForTheDay + taskDuration;

  if (totalHoursWithNewTask > 8) {
    return next(
      new Error(
        "Task cannot be assigned: Employee will exceed 8 hours of work in a day"
      )
    );
  }

  next();
});

const TaskModel = model<Task>("Task", taskSchema);
export default TaskModel;
