import { useEffect, useState } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLoading, setScrapedPositions } from "../../store/auditSlice";
import { RefreshCw } from "lucide-react";
import { getScrapedPositions } from "@/services/api";
import { DatePicker } from "./DatePicker";

export function ScrapedPositionsTable() {
  const dispatch = useAppDispatch();
  const { isLoading, scrapedPositions } = useAppSelector((state) => state.audit);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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

  useEffect(() => {
    fetchData(selectedDate);
  }, [dispatch, selectedDate]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Scraped Positions</h2>
        <div className="flex items-center gap-4">
          <DatePicker
            label="Scraped Positions from"
            onDateChange={handleDateChange}
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
      <DataTable columns={columns} data={scrapedPositions} isLoading={isLoading} />
    </div>
  );
} 