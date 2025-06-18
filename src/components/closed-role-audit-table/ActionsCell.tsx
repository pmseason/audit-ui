import { Image } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog";
import { ClosedRoleAuditTask } from "@/types/audit";
import { getClosedRoleAuditTasks, updatePositionStatus } from "@/services/api";
import { Button } from "@/components/ui/button";
import { setClosedRoleTasks, setLoading } from "@/store/auditSlice";
import { useAppDispatch } from "@/store/hooks";
import { JobStatus } from "@/types/jobs";

interface ActionsCellProps {
    task: ClosedRoleAuditTask;
}

export const ActionsCell = ({ task }: ActionsCellProps) => {
    const dispatch = useAppDispatch();
    const screenshot = task.screenshot;
    if (!screenshot) return <div>No screenshot</div>;

    const handleUpdateJobStatus = async (status: JobStatus) => {
        dispatch(setLoading(true));
        try {
            await updatePositionStatus(task.job.id, status);
            const tasks = await getClosedRoleAuditTasks();
            dispatch(setClosedRoleTasks(tasks));
        } catch (error) {
            console.error("Failed to close job:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <Image className="h-6 w-6 text-gray-600" />
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh]">
                    <img
                        src={screenshot}
                        alt="Screenshot"
                        className="w-full h-full object-contain"
                    />
                </DialogContent>
            </Dialog>

            {(task.result === "unsure" || task.result === "closed") && task.job.status === "open" && (
                <Button
                    onClick={() => handleUpdateJobStatus("closed")}
                    className="p-2 rounded-md transition-colors text-sm"
                >
                    Close Job
                </Button>
            )}

            {(task.result === "closed" || task.result === "unsure") && task.job.status === "closed" && (
                <Button
                    onClick={() => handleUpdateJobStatus("open")}
                    className="p-2 rounded-md transition-colors text-sm"
                >
                    Reopen Job
                </Button>
            )}


        </div>
    );
}; 