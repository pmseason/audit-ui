import { CSVLink } from "react-csv";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { prepareForCsv } from "@/api/csv";
import { LucideDownload, LucideWrench } from "lucide-react";
import UploadConfigForm from "./UploadConfigForm";
import { downloadFile } from "@/api/downloader";

export default function ActionsMenu() {
  //global app state
  const { searchResults, searchConfigData } = useContext(
    AppContext
  ) as GlobalState;

  //get the actually downloadable reszults ready
  const downloadableResults = searchResults.filter(
    (result) => result.tool !== "scraping"
  );

  return (
    <section className="flex flex-row gap-2 p-2 border border-black rounded-sm">
      <Button>
        <LucideDownload />
        <CSVLink data={prepareForCsv(downloadableResults)}>
          {`Download ${downloadableResults.length} Results`}
        </CSVLink>
      </Button>
      <Button onClick={() => downloadFile(searchConfigData)}>
        <LucideWrench />
        Download Configuration
      </Button>
      <Button>
        <LucideWrench />
        <UploadConfigForm triggerIcon={"Upload Configuration"} />
      </Button>
    </section>
  );
}
