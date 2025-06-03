
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OpenRoleAuditForm from "@/components/OpenRoleAuditForm";
import { Button } from "@/components/ui/button";

function OpenRoleAudit() {
    return (
        <main className="flex flex-col min-h-screen w-full">
            <AppSidebar />
            <header className="bg-gray-800 text-white p-4 flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Open Role Audit</h1>
            </header>
            <div className="px-10 py-10">
                <OpenRoleAuditForm triggerIcon={<Button>Add</Button>} />
                <h2 className="text-2xl font-bold mb-4">Open Role Audit Tasks</h2>
            </div>
        </main>
    );
}

export default OpenRoleAudit;
