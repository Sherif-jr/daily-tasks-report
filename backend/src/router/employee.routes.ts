import { Router } from "express";
import {
  joiValidateBody,
  joiValidateParams,
  joiValidateQuery,
} from "../middleware/joiValidator";
import { paramsWithIdSchema } from "../validation/common.validate";
import EmployeeController from "../controller/employee.controller";
import {
  employeeSchema,
  employeeUpdateSchema,
  getEmployeeSchema,
} from "../validation/employee.validate";

const employeeRouter = Router();

employeeRouter.get(
  "/",
  joiValidateQuery(getEmployeeSchema),
  EmployeeController.getEmployees
);
employeeRouter.get(
  "/:id",
  joiValidateParams(paramsWithIdSchema),
  EmployeeController.getEmployee
);
employeeRouter.post(
  "/",
  joiValidateBody(employeeSchema),
  EmployeeController.createEmployee
);
employeeRouter.put(
  "/:id",
  joiValidateParams(paramsWithIdSchema),
  joiValidateBody(employeeUpdateSchema),
  EmployeeController.updateEmployee
);
employeeRouter.delete(
  "/:id",
  joiValidateParams(paramsWithIdSchema),
  EmployeeController.deleteEmployee
);

export default employeeRouter;
