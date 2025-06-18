import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table";
import { columns } from "./Columns";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLoading, setOpenRoleTasks } from "../../store/auditSlice";
import { RefreshCw } from "lucide-react";
import { getOpenRoleAuditTasks } from "@/services/api";

export function OpenRoleAuditTable() {
  const dispatch = useAppDispatch();
  const { isLoading, openRoleTasks } = useAppSelector((state) => state.audit);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const tasks = await getOpenRoleAuditTasks();
      dispatch(setOpenRoleTasks(tasks));
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Open Role Audit Tasks</h2>
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
      <DataTable columns={columns} data={openRoleTasks} isLoading={isLoading} />
    </div>
  );
} 