import { ColumnDef } from "@tanstack/react-table";
import { ClosedRoleAuditTask } from "../../types/audit";
import { Checkbox } from "../ui/checkbox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleClosedRoleTaskSelection, selectAllClosedRoleTasks, clearClosedRoleSelection } from "../../store/auditSlice";
import { StatusCell } from "./StatusCell";
import { CompanyCell } from "./CompanyCell";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ActionsCell } from "./ActionsCell";

export const columns: ColumnDef<ClosedRoleAuditTask>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const dispatch = useAppDispatch();
      const selectedTasks = useAppSelector((state) => state.audit.selectedClosedRoleTasks);
      const allTaskIds = table.getRowModel().rows.map(row => row.original.id);
      const allSelected = allTaskIds.length > 0 && allTaskIds.every(id => selectedTasks.includes(id));

      return (
        <Checkbox
          checked={allSelected}
          onCheckedChange={() => dispatch(allSelected ? clearClosedRoleSelection() : selectAllClosedRoleTasks())}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      const selectedTasks = useAppSelector((state) => state.audit.selectedClosedRoleTasks);
      const isSelected = selectedTasks.includes(row.original.id);

      return (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => dispatch(toggleClosedRoleTaskSelection(row.original.id))}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "updated_at",
    header: "Last Run",
    cell: ({ row }) => {
      const updatedAt = row.original.updated_at;
      return (
        <div className="whitespace-nowrap">
          {updatedAt ? new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + new Date(updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) : "N/A"}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: ({ row }) => <div className="w-[80px]">{row.original.id}</div>,
  // },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => <CompanyCell company={row.original.job.company} />,
  },
  {
    accessorKey: "job",
    header: "Job",
    cell: ({ row }) => {
      const job = row.original.job;
      return (
        <div className="flex space-x-2">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[500px] truncate font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            {job.title || "Untitled"}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <StatusCell status={row.original.status} />
          {row.original.statusMessage && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original.statusMessage}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const result = row.original.result;
      return <div>{result}</div>;
    },
  },
  {
    accessorKey: "justification",
    header: "Justification",
    cell: ({ row }) => {
      const justification = row.original.justification;
      return (
        <div className="max-w-[500px] whitespace-normal break-words">
          {justification || "No justification provided"}
        </div>
      );
    },
  },
  {
    header: "Status in Job Table",
    cell: ({ row }) => {
      const status = row.original.job.status;
      return <div>{status}</div>;
    },
  },
  {
    accessorKey: "screenshot",
    header: "Screenshot",
    cell: ({ row }) => {
      return <ActionsCell task={row.original} />;
    },
  },
];
