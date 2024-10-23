import { Router } from "express";
import { joiValidateBody, joiValidateParams } from "../middleware/joiValidator";
import { paramsWithIdSchema } from "../validation/common.validate";
import { taskSchema } from "../validation/task.validate";
import TaskController from "../controller/task.controller";

const tasksRouter = Router();

tasksRouter.get("/", TaskController.getTasks);
tasksRouter.get(
  "/:id",
  joiValidateParams(paramsWithIdSchema),
  TaskController.getTask
);
tasksRouter.post("/", joiValidateBody(taskSchema), TaskController.createTask);
tasksRouter.put(
  "/:id",
  joiValidateParams(paramsWithIdSchema),
  joiValidateBody(taskSchema),
  TaskController.updateTask
);
tasksRouter.delete(
  "/:id",
  joiValidateParams(paramsWithIdSchema),
  TaskController.deleteTask
);

export default tasksRouter;
