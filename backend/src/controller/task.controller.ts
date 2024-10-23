import TaskDao from "../db/dao/task.dao";
import tryCatch from "../helpers/tryCatch";
import Task from "../interfaces/task.interface";
const taskDao = new TaskDao();
class TaskController {
  static getTasks = tryCatch(async (_, res) => {
    const tasks = await taskDao.getTasks();
    res.json({
      data: tasks,
      message: "Get tasks",
    });
  });

  static createTask = tryCatch(async (req, res) => {
    console.log({ body: req.body });

    const task = req.body as Task;
    const newTask = await taskDao.createTask(task);
    res.status(201).json({
      data: newTask,
      message: newTask ? "Task created" : "Failed to create task",
    });
  });

  static getTask = tryCatch(async (req, res) => {
    const id = (req.params as { id: string }).id;
    const task = await taskDao.getTask(id);
    res.json({
      data: task,
      message: "Get task",
    });
  });
  static updateTask = tryCatch(async (req, res) => {
    const id = (req.params as { id: string }).id;
    const task = req.body as Task;
    const updatedTask = await taskDao.updateTask(id, task);
    res.json({
      data: updatedTask,
      message: updatedTask
        ? "Task updated"
        : "Failed to update task or Not found",
    });
  });

  static deleteTask = tryCatch(async (req, res) => {
    const id = (req.params as { id: string }).id;
    const deletedTask = await taskDao.deleteTask(id);
    res.json({
      data: deletedTask,
      message: deletedTask ? "Task deleted" : "Failed or Not found",
    });
  });
}

export default TaskController;
