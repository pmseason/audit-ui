import { AuditStatus } from "@/types/audit";
import { cn } from "../../lib/utils";

type StatusCellProps = {
  status: AuditStatus;
};

const statusStyles: Record<AuditStatus, { bg: string; text: string }> = {
  in_progress: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  completed: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  failed: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  not_run: {
    bg: "bg-gray-100",
    text: "text-gray-800",
  },
};

export const StatusCell = ({ status }: StatusCellProps) => {
  const style = statusStyles[status] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        style.bg,
        style.text,
        status === "in_progress" || status === "pending" && "animate-pulse"
      )}
    >
      {status}
    </div>
  );
}; 