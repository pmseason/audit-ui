import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { LucideDownload, LucideWrench } from "lucide-react";
import UploadConfigForm from "./UploadConfigForm";
import { downloadFile } from "@/api/downloader";
import { CSVLink } from "react-csv";
import { prepareForCsv } from "@/api/csv";
import { SearchResult } from "@pmseason/ai-job-scraper";

export default function ActionsMenu() {
  //global app state
  const { searchData } = useContext(AppContext) as GlobalState;

  const downloadableResults: SearchResult[] = [];
  for (const search of searchData) {
    const results = search.results;
    if (!results) continue;
    results.forEach((result) => {
      if (result.tool !== "scraping") {
        downloadableResults.push(result);
      }
    });
  }
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
