import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import EmployeeService from "@/services/EmployeeService";
import { cacheData } from "@/store/slices/cache.slice";
import { Employee, EmployeeInput } from "@/interfaces/employee.interface";
interface UseEmployeeConfig {
  fetchImmediately?: boolean;
  date: Date;
}
const useEmployee = (config?: UseEmployeeConfig) => {
  const cachedEmployees = useAppSelector((state) => state.cache.employees, {
    equalityFn: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  });
  const [isLoading, setIsLoading] = useState(!cachedEmployees);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const fetchEmployees = useCallback(async () => {
    if (!cachedEmployees) {
      setIsLoading(true);
    }
    setIsFetching(true);
    const { success, data, error } = await EmployeeService.getAllEmployees(
      config?.date?.toISOString() || new Date().toISOString()
    );
    if (success) {
      dispatch(
        cacheData({
          key: "employees",
          data,
        })
      );
      setIsFetching(false);
      setIsLoading(false);
      return data;
    } else {
      setError(error);
      setIsFetching(false);
      setIsLoading(false);
      return [];
    }
  }, [cachedEmployees, config?.date, dispatch]);

  const createEmployee = useCallback(
    async (employeeData: EmployeeInput) => {
      const { success, data, error } = await EmployeeService.createEmployee(
        employeeData
      );
      if (success) {
        //optimistic ui
        const optimisticData = [...(cachedEmployees || []), data];
        dispatch(
          cacheData({
            key: "employees",
            data: optimisticData,
          })
        );
        fetchEmployees();
        return data;
      } else {
        setError(error);
        return null;
      }
    },
    [cachedEmployees, dispatch, fetchEmployees]
  );
  const updateEmployee = useCallback(
    async (employeeData: Employee) => {
      const { success, data, error } = await EmployeeService.updateEmployee(
        employeeData
      );
      if (success) {
        //optimistic ui
        const optimisticData = (cachedEmployees || []).map((employee) =>
          employee._id === employee._id ? data : employee
        );
        dispatch(
          cacheData({
            key: "employees",
            data: optimisticData,
          })
        );
        fetchEmployees();
        return data;
      } else {
        setError(error);
        return null;
      }
    },
    [cachedEmployees, dispatch, fetchEmployees]
  );

  const deleteEmployee = useCallback(
    async (id: string) => {
      const { success, error } = await EmployeeService.deleteEmployee(id);
      if (success) {
        //optimistic ui
        const optimisticData = (cachedEmployees || []).filter(
          (employee) => employee._id !== id
        );
        dispatch(
          cacheData({
            key: "employees",
            data: optimisticData,
          })
        );
        fetchEmployees();
        return true;
      } else {
        setError(error);
        return false;
      }
    },
    [cachedEmployees, dispatch, fetchEmployees]
  );

  useEffect(() => {
    if (config?.fetchImmediately) {
      fetchEmployees();
    }
  }, [fetchEmployees, config?.fetchImmediately]);

  return {
    employees: cachedEmployees || [],
    isLoading,
    isFetching,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployee;
