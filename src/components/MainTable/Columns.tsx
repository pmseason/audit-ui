import { ColumnDef } from "@tanstack/react-table";
import {
  LucideArrowDown,
  LucideArrowRight,
  LucideCheck,
  LucideLoader,
  LucideTrash2,
  LucideX,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Search, SearchStatus } from "@/types/types";

export const getColumns = (
  searchData: Search[],
  includeInNextSearch: (index: number) => void,
  excludeFromNextSearch: (index: number) => void,
  removeFromConfig: (index: number) => void
): ColumnDef<Search>[] => [
  {
    header: "See More",
    cell({ row }) {
      return (
        <div
          onClick={row.getToggleExpandedHandler()}
          className="cursor-pointer"
        >
          {row.getIsExpanded() ? <LucideArrowDown /> : <LucideArrowRight />}
        </div>
      );
    },
  },
  {
    header: "Include in Next Search",
    accessorKey: "includeInNextSearch",
    cell({ row }) {
      return (
        <Checkbox
          className="border-black"
          defaultChecked={searchData[row.index].includeInNextSearch}
          onCheckedChange={(checked) => {
            if (checked) includeInNextSearch(row.index);
            else excludeFromNextSearch(row.index);
          }}
        />
      );
    },
  },
  {
    header: "Source Name",
    accessorKey: "supportedSource",
    cell({ row }) {
      const configData = row.original;
      return configData.config.scrapeFrom.name;
    },
  },
  {
    header: "URL",
    accessorKey: "config.scrapeFrom.url",
    cell({ row }) {
      const configData = row.original;
      const url = new URL(configData.config.scrapeFrom.url);
      return url.hostname;
    },
  },
  {
    header: "Role Type",
    accessorKey: "config.roleType",
    cell({ row }) {
      const configData = row.original;
      return configData.config.roleType;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell({ row }) {
      const { status } = row.original;
      switch (status) {
        case SearchStatus.Error:
          return <LucideX color="red" />;
        case SearchStatus.Success:
          return <LucideCheck color="green" />;
        case SearchStatus.InProgress:
          return <LucideLoader />;
        default:
          return "----";
      }
    },
  },
  {
    header: "Actions",
    cell({ row }) {
      return (
        <span className="flex flex-row gap-4">
          <button type="button" onClick={() => removeFromConfig(row.index)}>
            <LucideTrash2 />
          </button>
        </span>
      );
    },
  },
];
