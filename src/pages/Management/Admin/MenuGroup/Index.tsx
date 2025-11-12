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
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MenuItem = {
  id: number;
  group: string;
  name: string;
  url: string;
  icon: string;
  order: number;
};

export default function MenuGroupList() {
  const [data, setData] = useState<MenuItem[]>([
    {
      id: 1,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 1,
    },
    {
      id: 2,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 2,
    },
    {
      id: 3,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 3,
    },
    {
      id: 4,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 4,
    },
    {
      id: 5,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 5,
    },
    {
      id: 6,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 6,
    },
    {
      id: 7,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 7,
    },
    {
      id: 8,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 8,
    },
    {
      id: 9,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 9,
    },
    {
      id: 10,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 10,
    },
    {
      id: 11,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 11,
    },
    {
      id: 12,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 12,
    },
    {
      id: 13,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 13,
    },
    {
      id: 14,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 14,
    },
    {
      id: 15,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 15,
    },
    {
      id: 16,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 16,
    },
    {
      id: 17,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 17,
    },
    {
      id: 18,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 18,
    },
    {
      id: 19,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 19,
    },
    {
      id: 20,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 20,
    },
    {
      id: 21,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 21,
    },
    {
      id: 22,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 22,
    },
    {
      id: 23,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 23,
    },
    {
      id: 24,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 24,
    },
    {
      id: 25,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 25,
    },
    {
      id: 26,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 26,
    },
    {
      id: 27,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 27,
    },
    {
      id: 28,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 28,
    },
    {
      id: 29,
      group: "PayRoll",
      name: "PayRoll",
      url: "www.hrsystem.com",
      icon: "Admin.jpeg",
      order: 29,
    },
    {
      id: 30,
      group: "Attendance",
      name: "Attendance",
      url: "www.hrsystem.com",
      icon: "User.jpeg",
      order: 30,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const paginatedData = data.slice(startRow, endRow);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleDelete = (e: React.MouseEvent, taskId: number) => {
    e.stopPropagation();
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    // Remove the item from the array
    setData((prevData) => prevData.filter((item) => item.id !== taskToDelete));

    const newTotalPages = Math.ceil((data.length - 1) / rowsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };
  return (
    <>
      <div className="p-6 w-full flex flex-col">
        <div className="flex justify-between gap-2 items-center mb-4">
          <p className="text-xl md:text-2xl lg:text-3xl  font-bold">
            {" "}
            Menu Group
          </p>

          <div className="flex gap-3 items-center">
            <div className="relative w-[250px] md:w-[350px] lg:w-[450px] ">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9 text-black focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 rounded-md shadow-sm border-0  "
              />
            </div>

            <Button asChild className="outline-btn">
              <Link to="/menuitem/create">+ Create</Link>
            </Button>
          </div>
        </div>

        <div>
          <Table className="w-full border-collapse ">
            <TableHeader>
              <TableRow className="  bg-primary-300 py-18 border-0">
                <TableHead className="w-[100px] text-center py-4">No</TableHead>
                <TableHead className="text-center py-4">
                  Menu Group Name
                </TableHead>
                <TableHead className="text-center py-4">Menu Name</TableHead>
                <TableHead className="text-center py-4">Url</TableHead>
                <TableHead className="text-center py-4">Icon</TableHead>
                <TableHead className="text-center py-4">Sort Order</TableHead>

                <TableHead className="text-center py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, items) => (
                <TableRow
                  key={items}
                  className="odd:bg-primary-100 even:bg-primary-50 hover:bg-primary-200 transition-colors border-none py-3"
                >
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center">{item.group}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.url}</TableCell>
                  <TableCell className="text-center">{item.icon}</TableCell>
                  <TableCell className="text-center">{item.order}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button asChild className="text-primary-500 cursor-pointer">
                      <Link to={`/menuitem/edit`} state={{ item }}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      className="text-error-400 cursor-pointer"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="text-sm text-gray-600">
            Showing {startRow + 1}–{endRow} of {totalRows}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            >
              «
            </button>
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            >
              ‹
            </button>
            <Button
              onClick={goPrev}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            ></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-primary-500 text-natural-50"
                    : "bg-natural-50 text-black hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            ></button>

            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            >
              ›
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
            >
              »
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              {[5, 10, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-secondary-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-md">
              <div className="flex gap-3">
                <Trash2 className="h-6 w-6 text-gray-600" /> Are you sure you
                want to delete this record?
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
