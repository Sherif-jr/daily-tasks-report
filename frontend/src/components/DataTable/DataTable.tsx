import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ReactNode } from "react";
import Alert from "../Alert/DeleteAlert";
import EmployeeDialog from "../Dialog/EmployeeDialog";

interface DataTableProps<T extends object> {
  data: T[];
  dataKeyProp: keyof T;
  columns: (keyof T)[];
  caption?: string;
  loading?: boolean;
  refetching?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddNew?: (data: any) => void;
  rowExtraInfoComponent?: (row: T) => ReactNode;
}
const DataTable = <T extends object>({
  data,
  columns,
  dataKeyProp,
  loading,
  refetching,
  caption,
  onEdit,
  onDelete,
  onAddNew,
  rowExtraInfoComponent,
}: DataTableProps<T>) => {
  return (
    <>
      {!loading && refetching && (
        <div className="flex justify-center items-center">
          <Spinner size="medium" />
        </div>
      )}
      <div className="justify-end flex">
        <EmployeeDialog title="Add new employee" description="" onOk={onAddNew}>
          <Button variant="outline">
            <Plus />
          </Button>
        </EmployeeDialog>
      </div>
      <Table>
        {caption && (
          <TableCaption className="text-3xl font-bold text-start mb-4 capitalize">
            {caption}
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className="capitalize">
                {column as string}
              </TableHead>
            ))}
            <TableHead className="w-40">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {!loading && (
          <TableBody>
            {data.map((row) => {
              return (
                <Collapsible
                  key={row[dataKeyProp] as string}
                  className="w-full"
                  asChild
                  disabled={!rowExtraInfoComponent}
                >
                  <>
                    <CollapsibleTrigger asChild>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column as string}>
                            {row[column] as string}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2">
                            {onEdit && (
                              <EmployeeDialog
                                title="Update Employee"
                                description=""
                                initialValues={row}
                                onOk={(values) => onEdit(values as typeof row)}
                              >
                                <Button
                                  onClick={(e) => e.stopPropagation()}
                                  variant="outline"
                                >
                                  <Pencil />
                                </Button>
                              </EmployeeDialog>
                            )}
                            {onDelete && (
                              <Alert
                                onOk={() => onDelete(row)}
                                title="Are you sure you want to delete?"
                                description="This action cannot be undone."
                              >
                                <Button
                                  variant="destructive"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Trash />
                                </Button>
                              </Alert>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <TableRow>
                        <TableCell colSpan={columns.length + 1}>
                          {rowExtraInfoComponent?.(row)}
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })}
          </TableBody>
        )}
      </Table>
      {!data?.length && (
        <div className="p-12 flex justify-center items-center min-h-14 w-full">
          <p className="text-gray-400 font-bold text-xl w-full text-center">
            No data found
          </p>
        </div>
      )}
      {loading && (
        <div className="w-full flex justify-center items-center h-[80vh]">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default DataTable;
