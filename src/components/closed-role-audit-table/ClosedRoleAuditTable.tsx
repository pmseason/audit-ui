import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table";
import { columns } from "./Columns";
import { getClosedRoleAuditTasks } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLoading, setClosedRoleTasks } from "../../store/auditSlice";
import { AuditStatus } from "../../types/audit";
import { RefreshCw } from "lucide-react";

export function ClosedRoleAuditTable() {
  const dispatch = useAppDispatch();
  const { closedRoleTasks, isLoading } = useAppSelector((state) => state.audit);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const tasks = await getClosedRoleAuditTasks();
      dispatch(setClosedRoleTasks(tasks));
      setLastRefreshed(new Date());
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const hasInProgressTasks = closedRoleTasks.some(
      (task) => task.status === AuditStatus.IN_PROGRESS || task.status === AuditStatus.PENDING
    );

    if (!hasInProgressTasks) return;

    const pollInterval = setInterval(fetchData, 15000);

    return () => clearInterval(pollInterval);
  }, [closedRoleTasks]);


  //sort closedRoleTasks to put in progress tasks at the top
  const statusOrder = {
    [AuditStatus.IN_PROGRESS]: 0,
    [AuditStatus.PENDING]: 1,
    [AuditStatus.FAILED]: 2,
    [AuditStatus.COMPLETED]: 3,
    [AuditStatus.NOT_RUN]: 4
  };

  const sortedTasks = [...closedRoleTasks].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Closed Role Audit Tasks</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Last refreshed: {lastRefreshed.toLocaleTimeString()}</span>
          <button
            onClick={fetchData}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={sortedTasks} isLoading={isLoading} />
    </div>
  );
} 