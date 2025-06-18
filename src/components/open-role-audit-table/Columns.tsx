import { ColumnDef } from "@tanstack/react-table";
import { OpenRoleAuditTask } from "../../types/audit";
import { StatusCell } from "../closed-role-audit-table/StatusCell";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const columns: ColumnDef<OpenRoleAuditTask>[] = [
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
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.original.url;
      return (
        <div className="flex space-x-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[500px] truncate font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            {url}
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
          {row.original.status_message && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row.original.status_message}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "extra_notes",
    header: "Extra Notes",
    cell: ({ row }) => {
      const notes = row.original.extra_notes;
      return (
        <div className="max-w-[500px] whitespace-normal break-words">
          {notes || "No notes provided"}
        </div>
      );
    },
  }
]; 