import { useEffect, useState } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLoading, setScrapedPositions } from "../../store/auditSlice";
import { RefreshCw } from "lucide-react";
import { getScrapedPositions } from "@/services/api";
import { DatePicker } from "./DatePicker";

export function ScrapedPositionsTable() {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get('date');
  const pageParam = urlParams.get('page');
  
  const dispatch = useAppDispatch();
  const { isLoading, scrapedPositions } = useAppSelector((state) => state.audit);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    dateParam ? new Date(dateParam + 'T00:00:00') : undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(
    pageParam ? parseInt(pageParam, 10) - 1 : 0
  );

  const fetchData = async (date?: Date) => {
    dispatch(setLoading(true));
    try {
      const dateParam = date ? date.toISOString().split('T')[0] : undefined;
      const positions = await getScrapedPositions(dateParam);
      dispatch(setScrapedPositions(positions));
      setLastRefreshed(new Date());
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateUrl = (date?: Date, page?: number) => {
    const newUrl = new URL(window.location.href);
    
    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      newUrl.searchParams.set('date', dateStr);
    } else {
      newUrl.searchParams.delete('date');
    }
    
    if (page !== undefined && page >= 0) {
      newUrl.searchParams.set('page', (page + 1).toString());
    } else {
      newUrl.searchParams.delete('page');
    }
    
    window.history.pushState({}, '', newUrl);
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    updateUrl(selectedDate, pageIndex);
  };

  useEffect(() => {
    fetchData(selectedDate);
    updateUrl(selectedDate, currentPage);
  }, [dispatch, selectedDate]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Scraped Positions</h2>
        <div className="flex items-center gap-4">
          <DatePicker
            label="Scraped Positions from"
            onDateChange={setSelectedDate}
            initialDate={selectedDate}
          />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Last refreshed: {lastRefreshed.toLocaleTimeString()}</span>
            <button
              onClick={() => fetchData(selectedDate)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        This is a list of positions scraped from the given date. These positions are stored in our SCRAPED_POSITIONS table. To edit a position, you can click the "Edit in Directus" button.
        This only edits the position in the SCRAPED_POSITIONS table. When you have validated the fields, you can promote the position to our main site by clicking the plus icon. IMPORTANT:
        Once added to the main site, if you want to edit further, you must go to directus manually to edit it again. The edit button only takes you to edit the SCRAPED_POSITIONS table. 
        If you accidentally added the position the the site, there is an option to delete/undo it.
      </p>
      <DataTable 
        columns={columns} 
        data={scrapedPositions} 
        isLoading={isLoading}
        initialPageIndex={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 