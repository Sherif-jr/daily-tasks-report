import { ApiEndpoints } from "@/constants/enums";
import axiosInstance from "@/helpers/axiosInstance";
import { ApiResponse } from "@/interfaces/api.interface";
import Task, { TaskInput } from "@/interfaces/task.interface";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

class TaskService {
  static async addTaskToEmployee(task: TaskInput) {
    try {
      const { data } = await axiosInstance.post<ApiResponse<Task>>(
        ApiEndpoints.TASKS,
        task
      );
      return {
        success: true as const,
        data: data.data,
      };
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || error.message);
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
        toast.error("Something went wrong");
        return {
          success: false as const,
          error: error.message,
        };
      } else {
        return {
          success: false as const,
          error: "An unknown error occurred",
        };
      }
    }
  }
  static async updateTask(task: Task) {
    const { title, description, from, to, employee } = task;
    try {
      const { data } = await axiosInstance.put<ApiResponse<Task>>(
        `${ApiEndpoints.TASKS}/${task._id}`,
        {
          title,
          description,
          from,
          to,
          employee,
        }
      );
      return {
        success: true as const,
        data: data.data,
      };
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.request?.data || error.message);
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
        toast.error("Something went wrong");
        return {
          success: false as const,
          error: error.message,
        };
      } else {
        return {
          success: false as const,
          error: "An unknown error occurred",
        };
      }
    }
  }
  static async deleteTask(taskId: string) {
    try {
      await axiosInstance.delete(`${ApiEndpoints.TASKS}/${taskId}`);
      return {
        success: true as const,
      };
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.request?.data || error.message);
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
        toast.error("Something went wrong");
        return {
          success: false as const,
          error: error.message,
        };
      } else {
        return {
          success: false as const,
          error: "An unknown error occurred",
        };
      }
    }
  }
}

export default TaskService;
