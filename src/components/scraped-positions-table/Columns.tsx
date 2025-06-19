import { ColumnDef } from "@tanstack/react-table";
import { ScrapedPosition } from "@/types/audit";
import { useState } from "react";
import { CompanyCell } from "../common/CompanyCell";
import { ActionsCell } from "./ActionsCell";

export const columns: ColumnDef<ScrapedPosition>[] = [
  {
    header: "Company",
    cell: ({ row }) => {
      return (
        <CompanyCell company={row.original.company} />
      );
    },
  },
  {
    accessorKey: "site",
    header: "Site",
    cell: ({ row }) => {
      const site = row.original.site;
      return (
        <div className="whitespace-normal break-words">
          {site || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => {
      const url = row.original.url;
      return (
        <div className="max-w-[200px] whitespace-normal break-words">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {row.original.title}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "location", 
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.location;
      return (
        <div className="max-w-[200px] whitespace-normal break-words">
          {location}
        </div>
      );
    },
  },
  {
    accessorKey: "years_experience",
    header: "Years Experience",
    cell: ({ row }) => {
      const yearsExp = row.original.years_experience;
      return (
        <div className="whitespace-normal break-words">
          {yearsExp}
        </div>
      );
    },
  },
  {
    accessorKey: "salaryText",
    header: "Salary",
    cell: ({ row }) => {
      const salary = row.original.salaryText;
      return (
        <div className="whitespace-normal break-words">
          {salary}
        </div>
      );
    },
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
          {description && description.length > 300 && (
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ActionsCell position={row.original} />;
    },
  },
];
