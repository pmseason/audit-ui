import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { LucideDownload, LucideWrench } from "lucide-react";
import UploadConfigForm from "./UploadConfigForm";
import { downloadFile } from "@/api/downloader";
import { CSVLink } from "react-csv";
import { prepareForCsv } from "@/api/csv";

export default function ActionsMenu() {
  //global app state
  const { searchData } = useContext(AppContext) as GlobalState;

  const downloadableResults = searchData
    .filter((search) => search.results && search.results.tool !== "scraping")
    .map((search) => search.results)
    .filter((result) => result !== undefined);
  return (
    <section className="flex flex-row gap-2 p-2 border border-black rounded-sm">
      <Button>
        <LucideDownload />
        <CSVLink data={prepareForCsv(downloadableResults)}>
          {`Download ${downloadableResults.length} Results`}
        </CSVLink>
      </Button>
      <Button onClick={() => downloadFile(searchData)}>
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
