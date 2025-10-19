import { useMemo, useState, type SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Calendar1Icon,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  MoreVertical,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

// ---- Shared demo data so the list & details stay in sync ----
export type DemoProject = {
  id: number;
  code: string;
  name: string;
  status: "ASDF" | "OPEN" | "DONE";
  startDate: string; // 10/7/2025
  endDate: string; // 10/7/2025
};

// eslint-disable-next-line react-refresh/only-export-components
export const demoProjects: DemoProject[] = Array.from(
  { length: 300 },
  (_, i) => ({
    id: i + 1,
    code: "PJ1234",
    name: "Chan Lay",
    status: "ASDF",
    startDate: "10/7/2025",
    endDate: "10/7/2025",
  })
);

const pageWindow = (total: number, current: number, span = 5) => {
  const half = Math.floor(span / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + span - 1);
  start = Math.max(1, Math.min(start, end - span + 1));
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function ProjectListing() {
  const navigate = useNavigate();

  // ---- Controls ----
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // ---- Derived ----
  const filtered = useMemo(() => {
    if (!searchTerm) return demoProjects;
    const q = searchTerm.toLowerCase();
    return demoProjects.filter((r) =>
      [String(r.id), r.code, r.name, r.status, r.startDate, r.endDate]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [searchTerm]);

  const totalRows = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + rowsPerPage);
  const startRow = totalRows === 0 ? 0 : startIndex + 1;
  const endRow = Math.min(startIndex + rowsPerPage, totalRows);

  // Keep page in range if filter changes
  if (currentPage > totalPages) setCurrentPage(totalPages);

  return (
    <div className="p-6 w-full flex-1">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg font-semibold">Project Listing</h2>

        {/* Search */}
        <div className="relative w-full sm:w-72 order-3 sm:order-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search"
            className="pl-9"
          />
        </div>

        {/* Date range picker */}
        <div className="order-2 sm:order-none">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal w-[260px]",
                  !date.from && "text-muted-foreground"
                )}
              >
                <Calendar1Icon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "yy.MM.dd")} /{" "}
                      {format(date.to, "yy.MM.dd")}
                    </>
                  ) : (
                    format(date.from, "yy.MM.dd")
                  )
                ) : (
                  <span>25.09.06 / 25.10.06</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Create button */}
        <Link to="/projects/new" className="order-1 sm:order-none">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-lg border overflow-hidden">
        <Table className="w-full">
          <TableCaption>Project list.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">No.</TableHead>
              <TableHead className="min-w-[200px]">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row, idx) => (
              <TableRow
                key={row.id}
                onClick={() => navigate(`/projects/${row.id}`)}
                className="odd:bg-muted/40 even:bg-white hover:bg-muted cursor-pointer"
              >
                <TableCell className="font-medium">
                  {startIndex + idx + 1}.
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      className="p-1 hover:bg-muted rounded cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${row.id}/edit`);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${row.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        // delete logic here
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer: pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-background">
          {/* left */}
          <div className="text-sm text-muted-foreground">
            {startRow}-{endRow} of {totalRows}
          </div>

          {/* middle */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {pageWindow(totalPages, currentPage, 5).map((p) => (
              <Button
                key={p}
                variant={p === currentPage ? "default" : "ghost"}
                onClick={() => setCurrentPage(p)}
                className="px-3"
              >
                {p}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>

          {/* right */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows/Page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm bg-background"
            >
              {[10, 20, 30, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
