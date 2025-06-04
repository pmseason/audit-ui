import { ColumnDef } from "@tanstack/react-table";
import { OpenRoleAuditTask } from "../../types/audit";
import { StatusCell } from "../closed-role-audit-table/StatusCell";
import { Info, LucideArrowDown, LucideArrowRight, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleOpenRoleTaskSelection, selectAllOpenRoleTasks, clearOpenRoleSelection, setOpenRoleTasks, setLoading } from "../../store/auditSlice";
import { deleteOpenRoleTask, getOpenRoleTasks } from "../../services/api";

export const columns: ColumnDef<OpenRoleAuditTask>[] = [
  {
    header: "See More",
    cell({ row }) {
      return (
        <div
          onClick={row.getToggleExpandedHandler()}
          className="cursor-pointer"
        >
          {row.getIsExpanded() ? <LucideArrowDown /> : <LucideArrowRight />}
        </div>
      );
    },
  },
  {
    id: "select",
    header: ({ table }) => {
      const dispatch = useAppDispatch();
      const selectedTasks = useAppSelector((state) => state.audit.selectedOpenRoleTasks);
      const allTaskIds = table.getRowModel().rows.map(row => row.original.id);
      const allSelected = allTaskIds.length > 0 && allTaskIds.every(id => selectedTasks.includes(id));

      return (
        <Checkbox
          checked={allSelected}
          onCheckedChange={() => dispatch(allSelected ? clearOpenRoleSelection() : selectAllOpenRoleTasks())}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      const selectedTasks = useAppSelector((state) => state.audit.selectedOpenRoleTasks);
      const isSelected = selectedTasks.includes(row.original.id);

      return (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => dispatch(toggleOpenRoleTaskSelection(row.original.id))}
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
    header: "Last Updated",
    cell: ({ row }) => {
      const updatedAt = row.original.updated_at;
      return (
        <div className="whitespace-nowrap">
          {updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}
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
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      
      const handleDelete = async () => {
        dispatch(setLoading(true));
        try {
          await deleteOpenRoleTask(row.original.id);
          const tasks = await getOpenRoleTasks();
          dispatch(setOpenRoleTasks(tasks));
        } catch (error) {
          console.error('Error deleting task:', error);
        } finally {
          dispatch(setLoading(false));
        }
      };

      return (
        <button
          onClick={handleDelete}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-red-600 hover:text-red-700"
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
]; 