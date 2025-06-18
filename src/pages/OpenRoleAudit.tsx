import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { OpenRoleAuditTable } from "@/components/open-role-audit-table/OpenRoleAuditTable";

function OpenRoleAudit() {
    return (
        <main className="flex flex-col min-h-screen w-full">
            <AppSidebar />
            <header className="bg-gray-800 text-white p-4 flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Open Role Audit</h1>
            </header>
            <div className="px-10 py-10 flex flex-col gap-4">
                <OpenRoleAuditTable />
            </div>
        </main>
    );
}

export default OpenRoleAudit;
