import { Router } from "express";
import tasksRouter from "./tasks.routes";
import employeeRouter from "./employee.routes";

const router = Router();

router.all("/", (req, res) => {
  res.send("Welcome to daily tasks report api");
});
router.use("/tasks", tasksRouter);
router.use("/employees", employeeRouter);

export default router;
