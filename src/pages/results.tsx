import { prepareForCsv } from "@/api/csv";
import Header from "@/components/Header";
import { columns } from "@/components/ResultsTable/Columns";
import { DataTable } from "@/components/ResultsTable/DataTable";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { LucideDownload } from "lucide-react";
import { useContext } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router";

function Results() {
  const { searchResults } = useContext(AppContext) as GlobalState;
  //get the actually downloadable reszults ready
  const downloadableResults = searchResults.filter(
    (result) => result.tool !== "scraping"
  );
  return (
    <>
      <Header />

      <main className="px-4 flex flex-col items-start gap-4">
        <h1 className="text-2xl">Results</h1>
        <Link to="/">Back to Dashboard</Link>

        <section className="w-full flex flex-row justify-between items-center">
          <Button>
            <LucideDownload />
            <CSVLink data={prepareForCsv(downloadableResults)}>
              {`Download ${downloadableResults.length} Results`}
            </CSVLink>
          </Button>
        </section>

        <DataTable columns={columns} data={downloadableResults}/>
      </main>
    </>
  );
}

export default Results;
