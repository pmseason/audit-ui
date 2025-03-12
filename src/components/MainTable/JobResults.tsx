import { ProcessedJob } from "@pmseason/ai-job-scraper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "@/types/types";

interface Props {
  search: Search;
}

function JobResults({ search }: Props) {
  const processedJobs: ProcessedJob[] =
    (search.results?.jobs as ProcessedJob[]) ?? [];

  return (
    <div>
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
