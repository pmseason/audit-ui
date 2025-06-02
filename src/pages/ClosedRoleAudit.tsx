import { ClosedRoleAuditTable } from "../components/closed-role-audit-table/ClosedRoleAuditTable";
import { ActionsBar } from "../components/actions-bar/ActionsBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

function ClosedRoleAudit() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Job Audit</h1>
      </header>
      <div className="flex-1">
        <div className="p-4">
          <SidebarTrigger />
        </div>
        <ActionsBar />
        <ClosedRoleAuditTable />
      </div>
    </main>
  );
}

export default ClosedRoleAudit; 