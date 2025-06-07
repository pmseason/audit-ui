import { ColumnDef } from "@tanstack/react-table";
import { ScrapedJob } from "@/types/audit";
import { useState } from "react";

export const columns: ColumnDef<ScrapedJob>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => {
      const url = row.original.url;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {row.original.title}
        </a>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const [isExpanded, setIsExpanded] = useState(false);
      const description = row.original.description;
      
      return (
        <div className="max-w-md">
          <div className={`whitespace-normal break-words ${!isExpanded ? 'line-clamp-5' : ''}`}>
            {description}
          </div>
          {description.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "other",
    header: "Additional Info",
    cell: ({ row }) => {
      const [isExpanded, setIsExpanded] = useState(false);
      const other = row.original.other;
      
      return (
        <div className="max-w-md">
          <div className={`whitespace-normal break-words ${!isExpanded ? 'line-clamp-5' : ''}`}>
            {other}
          </div>
          {other && other.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      );
    },
  },
];
