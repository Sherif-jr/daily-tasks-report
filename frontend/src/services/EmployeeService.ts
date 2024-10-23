import { ApiEndpoints } from "@/constants/enums";
import axiosInstance from "@/helpers/axiosInstance";
import { ApiResponse } from "@/interfaces/api.interface";
import {
  Employee,
  EmployeeInput,
  EmployeeWithTasks,
} from "@/interfaces/employee.interface";
import { AxiosError } from "axios";

class EmployeeService {
  static async getAllEmployees(date: string) {
    try {
      const response = await axiosInstance.get<
        ApiResponse<EmployeeWithTasks[]>
      >(ApiEndpoints.EMPLOYEES, { params: { date } });
      return {
        success: true as const,
        data: response.data.data,
      };
    } catch (error: AxiosError | Error | unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
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
  static async createEmployee(employee: EmployeeInput) {
    try {
      const response = await axiosInstance.post<ApiResponse<EmployeeWithTasks>>(
        ApiEndpoints.EMPLOYEES,
        employee
      );
      return {
        success: true as const,
        data: response.data.data,
      };
    } catch (error: AxiosError | Error | unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
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
  static async updateEmployee(employee: Employee) {
    try {
      const { _id, name, title } = employee;
      const response = await axiosInstance.put<ApiResponse<EmployeeWithTasks>>(
        `${ApiEndpoints.EMPLOYEES}/${_id}`,
        {
          name,
          title,
        }
      );
      return {
        success: true as const,
        data: response.data.data,
      };
    } catch (error: AxiosError | Error | unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
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
  static async deleteEmployee(id: string) {
    try {
      const response = await axiosInstance.delete<ApiResponse<Employee>>(
        `${ApiEndpoints.EMPLOYEES}/${id}`
      );
      return {
        success: true as const,
        data: response.data.data,
      };
    } catch (error: AxiosError | Error | unknown) {
      if (error instanceof AxiosError) {
        return {
          success: false as const,
          error: error.request?.data || error.message,
        };
      } else if (error instanceof Error) {
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

export default EmployeeService;
