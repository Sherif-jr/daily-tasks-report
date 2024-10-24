import DataTable from "@/components/DataTable";
import EmployeeExtraInfo from "@/components/ExtraInfo/ExtraInfo";
import { Calendar } from "@/components/ui/calendar";
import { constructCorrectDate } from "@/helpers/dateHelpers";
import useEmployee from "@/hooks/useEmployee";
import { Employee, EmployeeInput } from "@/interfaces/employee.interface";
import TaskService from "@/services/TaskService";
import { useState } from "react";
import { toast } from "react-toastify";

const Employees = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    employees,
    isLoading,
    isFetching,
    deleteEmployee,
    updateEmployee,
    createEmployee,
    fetchEmployees,
  } = useEmployee({
    fetchImmediately: true,
    date: selectedDate,
  });
  // const handleUpdateEmployee = (row: Employee) => {};
  const handleDeleteEmployee = (row: Employee) => {
    deleteEmployee(row._id);
  };
  const handleEditEmployee = (row: Employee) => {
    updateEmployee(row);
  };
  const handleCreateEmployee = (data: EmployeeInput) => {
    createEmployee(data);
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row justify-center">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(_, selDay) => {
            const correctDate = constructCorrectDate(selDay);
            setSelectedDate(correctDate);
          }}
          className="rounded-md border"
        />
      </div>
      <div className="w-full">
        <DataTable
          data={employees}
          columns={["name", "title"]}
          dataKeyProp="_id"
          loading={isLoading}
          refetching={isFetching}
          caption="Employees List"
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onAddNew={(data: EmployeeInput) => handleCreateEmployee(data)}
          rowExtraInfoComponent={(row) => (
            <EmployeeExtraInfo
              employee={row}
              onAddNew={async (values) => {
                await TaskService.addTaskToEmployee(values);
                toast.success("Task added successfully");
                await fetchEmployees();
              }}
              onUpdate={async (values) => {
                await TaskService.updateTask(values);
                toast.success("Task updated successfully");
                await fetchEmployees();
              }}
              onDelete={async (id) => {
                await TaskService.deleteTask(id);
                toast.success("Task deleted successfully");
                await fetchEmployees();
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Employees;
