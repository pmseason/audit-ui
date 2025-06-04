import { ColumnDef } from "@tanstack/react-table";
import { ScrapedJob } from "@/types/audit";

export const columns: ColumnDef<ScrapedJob>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Job Title",
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
  },
  {
    accessorKey: "url",
    header: "Job URL",
  },
  {
    accessorKey: "other",
    header: "Additional Info",
  },
];
