import { Employee } from "../../interfaces/employee.interface";
import EmployeeModel from "../model/employee.model";

class EmployeeDao {
  async getEmployees(date: string) {
    // Calculate the start and end of the day based on the passed date
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // Aggregate query
    const employeesWithTasks = await EmployeeModel.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "employee",
          as: "tasks",
          pipeline: [
            {
              $match: {
                $and: [{ from: { $gte: dayStart } }, { to: { $lte: dayEnd } }],
              },
            },
          ],
        },
      },
    ]);
    return employeesWithTasks;
  }
  async getEmployee(id: string) {
    return await EmployeeModel.findById(id);
  }
  async createEmployee(employee: Employee) {
    return await EmployeeModel.create(employee);
  }
  async updateEmployee(id: string, employee: Employee) {
    return await EmployeeModel.findByIdAndUpdate(id, employee, {
      new: true,
    }).populate("tasks");
  }
  async deleteEmployee(id: string) {
    return await EmployeeModel.findByIdAndDelete(id);
  }
  async getEmployeeTasks(id: string) {
    return await EmployeeModel.findById(id);
  }
  async getEmployeeTask(id: string, taskId: string) {
    return await EmployeeModel.findById(id).populate("tasks", taskId);
  }
}

export default EmployeeDao;
