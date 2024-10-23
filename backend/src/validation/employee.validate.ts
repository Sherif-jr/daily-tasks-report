import Joi from "joi";
import { Employee } from "../interfaces/employee.interface";
const getEmployeeSchema = Joi.object({
  date: Joi.date().required().messages({
    "any.required": "The date is required.",
    "date.base": "The date must be a valid date.",
  }),
});
const employeeSchema = Joi.object<Employee>({
  name: Joi.string().required().messages({
    "any.required": "The employee name is required.",
    "string.base": "The employee name must be a valid string.",
  }),
  title: Joi.string().required().messages({
    "any.required": "The employee title is required.",
    "string.base": "The employee title must be a valid string.",
  }),
  tasks: Joi.array().optional().messages({
    "array.base": "The employee tasks must be an array.",
  }),
});

const employeeUpdateSchema = Joi.object<Employee>({
  name: Joi.string().optional().messages({
    "string.base": "The employee name must be a valid string.",
  }),
  title: Joi.string().optional().messages({
    "string.base": "The employee title must be a valid string.",
  }),
  tasks: Joi.array().optional().messages({
    "array.base": "The employee tasks must be an array.",
  }),
});

export { employeeSchema, employeeUpdateSchema, getEmployeeSchema };
