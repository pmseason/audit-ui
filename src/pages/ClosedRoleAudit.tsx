import { ClosedRoleAuditTable } from "../components/closed-role-audit-table/ClosedRoleAuditTable";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

function ClosedRoleAudit() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <AppSidebar />
      <header className="bg-gray-800 text-white p-4 flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Job Audit</h1>
      </header>
      <div className="flex-1">
        <div className="p-4">
        </div>
        <ClosedRoleAuditTable />
      </div>
    </main>
  );
}

export default ClosedRoleAudit;