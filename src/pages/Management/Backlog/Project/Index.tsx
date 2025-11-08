import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAuthStore } from "@/stores/useAuthStore";

// ⬇️ shadcn confirm dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ProjectItem = {
  projectCode: string;
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  projectStatus: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
};

type ApiResponse = {
  isSuccess: boolean;
  data: {
    items: ProjectItem[];
    totalCount: number;
    pageNo: number;
    pageSize: number;
  };
  message: string;
};

type Row = {
  id: string; // projectCode
  name: string;
  status: string;
  startDate: string; // localized string for table
  endDate: string; // localized string for table
};

const API_BASE = import.meta.env.VITE_API_URL;

export default function ProjectListing() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const roleName = useAuthStore((s) => s.user?.roleName);

  // UI state
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // data state
  const [rows, setRows] = useState<Row[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // helpers for date range → ISO (inclusive)
  const toIsoStart = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x.toISOString();
  };
  const toIsoEnd = (d: Date) => {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x.toISOString();
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));
  const startRow = totalCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalCount);

  // keep page in range if totalCount shrinks
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${API_BASE}/Project/list`);
      url.searchParams.set("pageNo", String(currentPage));
      url.searchParams.set("pageSize", String(rowsPerPage));
      if (debouncedSearch) url.searchParams.set("search", debouncedSearch);
      if (date.from) url.searchParams.set("from", toIsoStart(date.from));
      if (date.to) url.searchParams.set("to", toIsoEnd(date.to));

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = (await res.json()) as ApiResponse;
      if (!json.isSuccess) throw new Error(json.message || "Request failed");

      const mapped: Row[] = json.data.items.map((p) => ({
        id: p.projectCode,
        name: p.projectName,
        status: p.projectStatus,
        startDate: new Date(p.startDate).toLocaleDateString(),
        endDate: new Date(p.endDate).toLocaleDateString(),
      }));

      setRows(mapped);
      setTotalCount(json.data.totalCount);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [
    API_BASE,
    currentPage,
    rowsPerPage,
    debouncedSearch,
    date.from,
    date.to,
    token,
  ]);

  // fetch data
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // pagination handlers
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToLast = () => setCurrentPage(totalPages);
  const goToFirst = () => setCurrentPage(1);

  // open confirm
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteError(null);
    setDeleteOpen(true);
  };

  // do delete
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(
        `${API_BASE}/Project/delete/${encodeURIComponent(deleteId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Delete failed (${res.status})`);
      }

      // optimistic local update
      setRows((prev) => prev.filter((r) => r.id !== deleteId));
      setTotalCount((c) => Math.max(0, c - 1));

      // if page becomes empty and there are previous pages, go back one and refetch
      setTimeout(() => {
        setDeleteOpen(false);
        setDeleting(false);
        setDeleteId(null);
        const pageNowWouldBeEmpty = rows.length === 1 && currentPage > 1;
        if (pageNowWouldBeEmpty) {
          setCurrentPage((p) => Math.max(1, p - 1));
        } else {
          // refetch to sync server pagination/total
          fetchList();
        }
      }, 0);
    } catch (e: any) {
      setDeleteError(e?.message ?? "Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 w-full flex-1">
      {/* Header row */}
      <div className="flex justify-between flex-col md:flex-row gap-2 mb-4">
        <p className="">Project Listing</p>

        {/* date picker */}
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "justify-start text-left font-normal w-[250px] outline-btn",
                  !date.from && "text-muted-foreground"
                )}
              >
                <Calendar1Icon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")}/
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-primary-500 text-white"
              align="start"
            >
              <Calendar
                mode="range"
                selected={date}
                onSelect={(range) => {
                  setDate(range ?? {});
                  setCurrentPage(1);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* search */}
        <div className="relative w-full md:w-[20%] text-primary-800">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 pl-9"
          />
        </div>

        <Button
          className="outline-btn"
          onClick={() => {
            const header = ["Code", "Name", "Status", "Start Date", "End Date"];
            const rowsCsv = rows.map((r) =>
              [r.id, r.name, r.status, r.startDate, r.endDate]
                .map((x) => `"${String(x).replace(/"/g, '""')}"`)
                .join(",")
            );
            const csv = [header.join(","), ...rowsCsv].join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `projects_page_${currentPage}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export
        </Button>

        <Link to="/projects/new">
          <Button
            className="outline-btn"
            disabled={roleName?.toLowerCase() === "employee"}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Table className="w-full overflow-auto shadow-sm rounded-md">
        <TableHeader className="bg-primary-300">
          <TableRow className="border-none">
            <TableHead className="w-[60px]">No</TableHead>
            <TableHead className="min-w-[200px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-red-500 py-6">
                {error}
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No data
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, idx) => (
              <TableRow
                key={row.id}
                className="odd:bg-primary-100 even:bg-primary-50 hover:bg-primary-200 transition-colors border-none cursor-pointer"
                onClick={() => navigate(`/projects/${row.id}`)}
              >
                <TableCell className="font-medium">
                  {(currentPage - 1) * rowsPerPage + idx + 1}.
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      className="p-1 hover:bg-primary-300/50 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${row.id}/edit`);
                      }}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4 text-primary-500" />
                    </button>
                    <button
                      className="p-1 hover:bg-primary-300/50 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${row.id}`);
                      }}
                      title="View"
                    >
                      <Eye className="h-4 w-4 text-primary-700" />
                    </button>
                    <button
                      className="p-1 hover:bg-primary-300/50 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(row.id);
                      }}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-error-400" />
                    </button>
                    <button
                      className="p-1 hover:bg-primary-300/50 rounded"
                      onClick={(e) => e.stopPropagation()}
                      title="More"
                    >
                      <MoreVertical className="h-4 w-4 text-primary-700" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          {startRow}–{endRow} of {totalCount}
        </div>

        <div className="flex space-x-1">
          <button
            onClick={goToFirst}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            aria-label="First page"
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>

          {/* compact page window */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages
            )
            .map((p, i, arr) => {
              const prev = arr[i - 1];
              const showDots = prev && p - prev > 1;
              return (
                <span key={p} className="flex">
                  {showDots && <span className="px-2">…</span>}
                  <button
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 rounded ${
                      p === currentPage
                        ? "bg-primary-500 text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              );
            })}

          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
          <button
            onClick={goToLast}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            aria-label="Last page"
          >
            <ChevronsRight />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows/page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 text-sm p-3"
          >
            {[10, 20, 30, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete confirm dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteError ? (
                <span className="text-red-600">{deleteError}</span>
              ) : (
                <>This action cannot be undone.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
