import { ClosedRoleAuditTable } from "./components/closed-role-audit-table/ClosedRoleAuditTable";
import { ActionsBar } from "./components/actions-bar/ActionsBar";

function App() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Job Audit</h1>
      </header>
      <main>
        <ActionsBar />
        <ClosedRoleAuditTable />
      </main>
    </div>
  );
}

export default App; 