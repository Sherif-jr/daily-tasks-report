import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";
import { FC, useState } from "react";
import Spinner from "../ui/Spinner";
interface DeleteAlertProps {
  title: string;
  description: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  children: React.ReactNode;
}
const Alert: FC<DeleteAlertProps> = ({
  title,
  description,
  children,
  onOk,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              setLoading(true);
              await onOk?.();
              setLoading(false);
            }}
          >
            {loading ? <Spinner size="small" /> : "Ok"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
