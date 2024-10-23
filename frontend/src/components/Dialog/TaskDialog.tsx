import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Employee } from "@/interfaces/employee.interface";
import Task, { TaskInput } from "@/interfaces/task.interface";
import { DateTimePicker } from "../ui/DateTimePicker";

interface EmployeeDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onOk?(values: TaskInput | Task): void | string | Promise<void | string>;
  onCancel?(): void | Promise<void>;
  initialValues?: Partial<Task>;
  employee: Employee;
}
const TaskDialog: FC<EmployeeDialogProps> = ({
  title,
  description,
  children,
  onOk,
  initialValues,
  employee,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Formik<TaskInput>
          // enableReinitialize={true}
          initialValues={{
            title: initialValues?.title || "",
            description: initialValues?.description || "",
            from: initialValues?.from || new Date().toISOString(),
            to: initialValues?.to || new Date().toISOString(),
            employee: employee._id,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            from: Yup.date().required("Required"),

            to: Yup.date()
              .required("Required")
              .test(
                "max-8-hours",
                "End time must be within 8 hours of start time",
                function (value) {
                  const { from } = this.parent;
                  if (!from || !value) return true; // skip validation if either date is missing
                  const diffInMs =
                    new Date(value).getTime() - new Date(from).getTime();
                  const diffInHours = diffInMs / (1000 * 60 * 60);
                  return diffInHours <= 8;
                }
              ),
          })}
          onSubmit={async (values) => {
            let error;
            if (initialValues) {
              error = await onOk?.({ ...initialValues, ...values });
            } else {
              error = await onOk?.(values);
            }

            if (error) {
              setFormError(error);
            } else {
              setDialogOpen(false);
            }
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <div className="col-span-3">
                      <Input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      <span className="text-red-500 text-xs">
                        {Boolean(touched.title && errors.title) && errors.title}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label htmlFor="name" className="text-right">
                      Description
                    </Label>
                    <div className="col-span-3">
                      <Input
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      <span className="text-red-500 text-xs">
                        {Boolean(touched.description && errors.description) &&
                          errors.description}
                      </span>
                    </div>
                  </div>

                  {/*  from */}
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label htmlFor="name" className="text-right">
                      From
                    </Label>
                    <div className="col-span-3">
                      <DateTimePicker
                        value={new Date(values.from)}
                        onChange={(value) => {
                          handleChange({
                            target: {
                              name: "from",
                              value: value?.toISOString(),
                            },
                          });
                        }}
                        placeholder="From"
                      />
                      <span className="text-red-500 text-xs">
                        {Boolean(touched.from && errors.from) && errors.from}
                      </span>
                    </div>
                  </div>
                  {/* to */}
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label htmlFor="name" className="text-right">
                      From
                    </Label>
                    <div className="col-span-3">
                      <DateTimePicker
                        value={new Date(values.to)}
                        onChange={(value) => {
                          handleChange({
                            target: {
                              name: "to",
                              value: value?.toISOString(),
                            },
                          });
                        }}
                        placeholder="To"
                      />
                      <span className="text-red-500 text-xs">
                        {Boolean(touched.to && errors.to) && errors.to}
                      </span>
                    </div>
                  </div>
                </div>
                {formError && (
                  <span className="text-red-500 text-xs">{formError}</span>
                )}
                <DialogFooter>
                  <Button type="submit">
                    {initialValues?._id ? "Save changes" : "Add"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default TaskDialog;
