import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OpenRoleAuditForm from "@/components/open-role-audit-form/OpenRoleAuditForm";
import { Button } from "@/components/ui/button";
import { OpenRoleAuditTable } from "@/components/open-role-audit-table/OpenRoleAuditTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getOpenRoleTasks, startOpenRoleAudit } from "@/services/api";
import { setLoading, setOpenRoleTasks } from "@/store/auditSlice";

function OpenRoleAudit() {
    const dispatch = useAppDispatch();
    const { selectedOpenRoleTasks } = useAppSelector((state) => state.audit);

    const handleStartAudit = async () => {
        if (selectedOpenRoleTasks.length === 0) return;
        
        dispatch(setLoading(true));
        try {
            await startOpenRoleAudit(selectedOpenRoleTasks);
            const tasks = await getOpenRoleTasks();
            dispatch(setOpenRoleTasks(tasks));
        } catch (error) {
            console.error('Error starting audit:', error);
            // You might want to show an error toast here
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <main className="flex flex-col min-h-screen w-full">
            <AppSidebar />
            <header className="bg-gray-800 text-white p-4 flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Open Role Audit</h1>
            </header>
            <div className="px-10 py-10">
                <div className="flex justify-between items-center mb-4">
                    <OpenRoleAuditForm triggerIcon={<Button>Add</Button>} />
                    <Button
                        onClick={handleStartAudit}
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        disabled={selectedOpenRoleTasks.length === 0}
                    >
                        Start Audit ({selectedOpenRoleTasks.length})
                    </Button>
                </div>
                <OpenRoleAuditTable />
            </div>
        </main>
    );
}

export default OpenRoleAudit;
