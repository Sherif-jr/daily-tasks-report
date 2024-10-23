import Tag from "../ui/Tag";
import { FC } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import TaskDialog from "../Dialog/TaskDialog";
import { EmployeeWithTasks } from "@/interfaces/employee.interface";
import Task, { TaskInput } from "@/interfaces/task.interface";
interface EmployeeExtraInfoProps {
  onAddNew?: (values: TaskInput) => void | string | Promise<void | string>;
  onUpdate?: (values: Task) => void | string | Promise<void | string>;
  onDelete?: (id: string) => void | Promise<void>;
  employee: EmployeeWithTasks;
}
const EmployeeExtraInfo: FC<EmployeeExtraInfoProps> = ({
  onAddNew,
  onUpdate,
  onDelete,
  employee,
}) => {
  return (
    <div className="flex gap-6 flex-col">
      <p className="font-bold text-lg">Tasks</p>
      <div className="flex flex-wrap gap-4 items-center">
        {employee?.tasks.map((task) => (
          <TaskDialog
            title={`Update task`}
            description=""
            employee={employee}
            onOk={onUpdate}
            onDelete={onDelete}
            initialValues={task}
          >
            <Tag key={task._id}>
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">{task.title}</p>
                <p>Form: {new Date(task.from).toLocaleString()}</p>
                <p>To: {new Date(task.to).toLocaleString()}</p>
              </div>
            </Tag>
          </TaskDialog>
        ))}
        <TaskDialog
          title={`Add a task to ${employee.name}`}
          description=""
          employee={employee}
          onOk={onAddNew}
        >
          <Button variant="outline">
            <Plus />
          </Button>
        </TaskDialog>
      </div>
    </div>
  );
};

export default EmployeeExtraInfo;
