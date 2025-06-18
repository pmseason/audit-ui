import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar";
import { ScrapedPositionsTable } from "@/components/scraped-positions-table/ScrapedPositionsTable";

function ScrapedPositions() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <AppSidebar />
      <header className="bg-gray-800 text-white p-4 flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Scraped Positions</h1>
      </header>
      <div className="flex-1">
        <div className="p-4">
        </div>
        <ScrapedPositionsTable />
      </div>
    </main>
  );
}

export default ScrapedPositions;