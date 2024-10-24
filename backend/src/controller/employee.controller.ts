import EmployeeDao from "../db/dao/employee.dao";
import tryCatch from "../helpers/tryCatch";
import { Employee } from "../interfaces/employee.interface";

const employeeDao = new EmployeeDao();
class EmployeeController {
  static createEmployee = tryCatch(async function (req, res: any) {
    const employee = req.body as Employee;
    const newEmployee = await employeeDao.createEmployee(employee);

    res.status(201).json({
      data: newEmployee,
      message: "Employee created",
    });
  });

  static getEmployees = tryCatch(async function (req, res) {
    const dateString = (req.query as { date: string }).date;
    const employees = await employeeDao.getEmployees(dateString);
    res.status(200).json({
      data: employees,
      message: "Get employees",
    });
  });

  static getEmployee = tryCatch(async function (req, res) {
    const id = (req.params as { id: string }).id;
    const employee = await employeeDao.getEmployee(id);
    res.status(200).json({
      data: employee,
      message: "Get employee",
    });
  });

  static getEmployeeTasks = tryCatch(async function (req, res) {
    const id = (req.params as { id: string }).id;
    const employeeTasks = await employeeDao.getEmployeeTasks(id);
    res.json({
      data: employeeTasks,
      message: "Get employee tasks",
    });
  });

  static updateEmployee = tryCatch(async function (req, res) {
    const id = (req.params as { id: string }).id;
    const employee = req.body as Employee;
    const updatedEmployee = await employeeDao.updateEmployee(id, employee);
    res.json({
      data: updatedEmployee,
      message: "Employee updated",
    });
  });

  static deleteEmployee = tryCatch(async function (req, res) {
    const id = (req.params as { id: string }).id;
    const deletedEmployee = await employeeDao.deleteEmployee(id);
    res.json({
      data: deletedEmployee,
      message: "Employee deleted",
    });
  });
}
export default EmployeeController;
