import { SearchResult } from "@pmseason/ai-job-scraper";
import { ColumnDef } from "@tanstack/react-table";
import { LucideCheck, LucideX } from "lucide-react";
import { Button } from "../ui/button";
export const columns: ColumnDef<SearchResult>[] = [
  {
    header: "See More",
    cell({ row }) {
      return row.getCanExpand() ? (
        <Button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer" }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </Button>
      ) : (
        ""
      );
    },
  },
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    cell({ row }) {
      const result = row.original;
      if (!result.timestamp) return;
      const date = new Date(result.timestamp);
      return date.toLocaleString();
    },
  },
  {
    header: "Scraped From",
    accessorKey: "searchConfig.scrapeFrom",
    cell({ row }) {
      const result = row.original;
      const { searchConfig } = result;
      if (!searchConfig) return;
      const { scrapeFrom } = searchConfig;
      if (!scrapeFrom) return;
      return (
        <div className="flex flex-col gap-1">
          <p className="font-bold">{scrapeFrom.name}</p>
        </div>
      );
    },
  },
  {
    header: "Success",
    accessorKey: "success",
    cell({ row }) {
      const result = row.original;
      return result.success ? (
        <LucideCheck color="green" />
      ) : (
        <LucideX color="red" />
      );
    },
  },
  {
    header: "Job Count",
    accessorKey: "count",
    cell({ row }) {
      const result = row.original;
      return result.count;
    },
  },
];
