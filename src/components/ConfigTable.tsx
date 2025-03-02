import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideTrash2 } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { Checkbox } from "./ui/checkbox";

const ConfigTable: React.FC = () => {
  //global app state
  const {
    removeFromConfig,
    includeInNextSearch,
    excludeFromNextSearch,
    searchConfigData,
  } = useContext(AppContext) as GlobalState;

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
        {searchConfigData.length > 0 ? (
          searchConfigData.map((configData, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  className="border-black"
                  defaultChecked={true}
                  onCheckedChange={(checked) => {
                    if (checked) includeInNextSearch(index);
                    else excludeFromNextSearch(index);
                  }}
                />
              </TableCell>
              <TableCell>{configData.config.scrapeFrom.name}</TableCell>
              <TableCell>
                {new URL(configData.config.scrapeFrom.url).hostname}
              </TableCell>
              <TableCell>{configData.config.roleType}</TableCell>
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
