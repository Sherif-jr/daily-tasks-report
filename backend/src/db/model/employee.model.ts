import { Schema, model } from "mongoose";
import { Employee } from "../../interfaces/employee.interface";

const employeeSchema = new Schema<Employee>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  }
);
const EmployeeModel = model<Employee>("Employee", employeeSchema);
export default EmployeeModel;
