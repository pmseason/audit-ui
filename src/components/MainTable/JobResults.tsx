import { Job, ProcessedJob } from "@pmseason/ai-job-scraper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, SearchStatus } from "@/types/types";
import { LucideMoveRight, LucideX } from "lucide-react";

interface Props {
  search: Search;
}

function JobResults({ search }: Props) {
  if (search.status === SearchStatus.Error) {
    return (
      <div className="flex items-center justify-center py-4">
        <LucideX color="red" />
        <span className="text-red-500 text-sm font-medium">
          An error occurred while fetching job results. Please try again later.
        </span>
      </div>
    );
  } else if (search.status === SearchStatus.NotRun) {
    return (
      <div className="flex items-center justify-center py-4">
        <span className="text-gray-500 text-sm font-medium">
          Job search has not been run yet. Please initiate a search to view
          results.
        </span>
      </div>
    );
  } else if (search.status === SearchStatus.InProgress) {
    return (
      <div className="flex items-center justify-center py-4">
        <span className="text-blue-500 text-sm font-medium">
          Job search is currently in progress. Please wait...
        </span>
      </div>
    );
  }

  const results = search.results ?? [];

  //firecrawl sends one result back, else both stages of the custom scrape are sent back
  const isFirecrawl = results.length === 1;

  const firecrawlJobs: ProcessedJob[] = isFirecrawl
    ? (results[0].jobs as ProcessedJob[])
    : [];
  const processedJobs: ProcessedJob[] =
    (results.find((result) => result.tool !== "scraping")
      ?.jobs as ProcessedJob[]) ?? [];

  const rawJobs: Job[] =
    results.find((result) => result.tool === "scraping")?.jobs ?? [];

  return (
    <div>
      {isFirecrawl ? (
        <p>{`Pulled ${firecrawlJobs.length} jobs from firecrawl`}</p>
      ) : (
        <span className="flex flex-row items-center gap-4">
          <p>{`Scraped ${rawJobs.length} jobs from the website`}</p>
          <LucideMoveRight />
          <p>{`${processedJobs.length} jobs left after filtering with AI`}</p>
        </span>
      )}

      <Table className=" divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </TableHead>
            <TableHead className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </TableHead>
            <TableHead className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </TableHead>
            <TableHead className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Application Link
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white  divide-gray-200">
          {processedJobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {job.title}
              </TableCell>
              <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.location}
              </TableCell>
              <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.description}
              </TableCell>
              <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.application_link ? (
                  <a
                    href={job.application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Apply
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobResults;
