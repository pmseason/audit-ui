import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchConfig } from "@mrinal-c/ai-job-scraper";
import { LucideTrash2 } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { Checkbox } from "./ui/checkbox";

interface ConfigTableProps {
  configs: SearchConfig[];
}

const ConfigTable: React.FC<ConfigTableProps> = ({ configs }) => {
  //global app state
  const { removeFromConfig, addToNextSearch, removeFromNextSearch } =
    useContext(AppContext) as GlobalState;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Include in Next Search</TableHead>
          <TableHead>Source Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Role Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {configs.length > 0 ? (
          configs.map((config, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  className="border-black"
                  defaultChecked={true}
                  onCheckedChange={(checked) => {
                    if (checked) addToNextSearch(index);
                    else removeFromNextSearch(index);
                  }}
                />
              </TableCell>
              <TableCell>{config.scrapeFrom.name}</TableCell>
              <TableCell>{new URL(config.scrapeFrom.url).hostname}</TableCell>
              <TableCell>{config.roleType}</TableCell>
              <TableCell>
                <span className="flex flex-row gap-4">
                  <button type="button" onClick={() => removeFromConfig(index)}>
                    <LucideTrash2 />
                  </button>
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No configs added
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ConfigTable;
