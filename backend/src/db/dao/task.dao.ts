import Task from "../../interfaces/task.interface";
import TaskModel from "../model/task.model";

class TaskDao {
  async getTasks() {
    return await TaskModel.find().populate("employee");
  }

  async createTask(task: Task) {
    return await TaskModel.create(task);
  }

  async getTask(id: string) {
    return await TaskModel.findById(id);
  }

  async updateTask(id: string, task: Task) {
    return await TaskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteTask(id: string) {
    return await TaskModel.findByIdAndDelete(id);
  }

  async getEmployeeTasks(id: string) {
    return await TaskModel.find({ employee: id });
  }
}

export default TaskDao;
