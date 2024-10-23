import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Employee, EmployeeInput } from "@/interfaces/employee.interface";

interface EmployeeDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onOk?(values: EmployeeInput): void | Promise<void>;
  onCancel?(): void | Promise<void>;
  initialValues?: Partial<Employee>;
}
const CustomDialog: FC<EmployeeDialogProps> = ({
  title,
  description,
  children,
  onOk,
  initialValues,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Formik<EmployeeInput>
          // enableReinitialize={true}
          initialValues={{
            name: initialValues?.name || "",
            title: initialValues?.title || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            title: Yup.string().required("Title is required"),
          })}
          onSubmit={(values) => {
            if (initialValues) {
              onOk?.({ ...initialValues, ...values });
            } else {
              onOk?.(values);
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
                      Name
                    </Label>
                    <div className="col-span-3">
                      <Input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <span className="text-red-500 text-xs">
                        {Boolean(touched.name && errors.name) && errors.name}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <Label htmlFor="name" className="text-right">
                      Job title
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
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">
                      {initialValues?._id ? "Save changes" : "Add"}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
