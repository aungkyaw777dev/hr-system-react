import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Button } from "@/components/ui/button";
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
import {
  Edit,
  Trash2,
  Plus,
  ChevronsRight,
  ChevronsLeft,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeeList({ onSort, sortConfig }) {
  const EmployeeData = [
    {
      Id: 1,
      EmployeeCode: "1111",
      Username: "ajohnson",
      Password: "12345678",
      Salary: 1000000,
      Name: "Alice Johnson",
      Role: "Developer",
      Email: "ajohnson@example.com",
      PhoneNo: "09270569999",
      StartDate: "2024-10-30",
      ResignDate: "",
    },
    {
      Id: 2,
      EmployeeCode: "1112",
      Username: "bsmith",
      Name: "Bob Smith",
      Role: "Developer",
      Email: "bsmith@example.com",
      PhoneNo: "09760265871",
      StartDate: "2024-07-29",
      ResignDate: "2025-04-24",
    },
    {
      Id: 3,
      EmployeeCode: "1113",
      Username: "clee",
      Name: "Carol Lee",
      Role: "Developer",
      Email: "clee@example.com",
      PhoneNo: "09166024140",
      StartDate: "2024-12-03",
      ResignDate: "2025-11-29",
    },
    {
      Id: 4,
      EmployeeCode: "1114",
      Username: "dbrown",
      Name: "David Brown",
      Role: "Sales Executive",
      Email: "dbrown@example.com",
      PhoneNo: "09167383304",
      StartDate: "2024-05-22",
      ResignDate: "2025-09-01",
    },
    {
      Id: 5,
      EmployeeCode: "1115",
      Username: "emartinez",
      Name: "Ella Martinez",
      Role: "Sales Executive",
      Email: "emartinez@example.com",
      PhoneNo: "09514246085",
      StartDate: "2024-12-20",
      ResignDate: "2025-11-30",
    },
    {
      Id: 6,
      EmployeeCode: "1116",
      Username: "fwilson",
      Name: "Frank Wilson",
      Role: "Developer",
      Email: "fwilson@example.com",
      PhoneNo: "09876521019",
      StartDate: "2024-07-23",
      ResignDate: "2025-09-22",
    },
    {
      Id: 7,
      EmployeeCode: "1117",
      Username: "gtaylor",
      Name: "Grace Taylor",
      Role: "HR",
      Email: "gtaylor@example.com",
      PhoneNo: "09615733460",
      StartDate: "2024-11-29",
      ResignDate: "2025-08-02",
    },
    {
      Id: 8,
      EmployeeCode: "1118",
      Username: "hdavis",
      Name: "Henry Davis",
      Role: "Sales Executive",
      Email: "hdavis@example.com",
      PhoneNo: "09583728789",
      StartDate: "2024-08-06",
      ResignDate: "2025-08-19",
    },
    {
      Id: 9,
      EmployeeCode: "1119",
      Username: "iwhite",
      Name: "Isla White",
      Role: "Designer",
      Email: "iwhite@example.com",
      PhoneNo: "09269599084",
      StartDate: "2024-10-09",
      ResignDate: "2025-03-28",
    },
    {
      Id: 10,
      EmployeeCode: "1120",
      Username: "jharris",
      Name: "Jack Harris",
      Role: "Accountant",
      Email: "jharris@example.com",
      PhoneNo: "09498693044",
      StartDate: "2024-07-17",
      ResignDate: "2025-08-20",
    },
    {
      Id: 11,
      EmployeeCode: "1121",
      Username: "klane",
      Name: "Karen Lane",
      Role: "HR",
      Email: "klane@example.com",
      PhoneNo: "09846575124",
      StartDate: "2024-06-24",
      ResignDate: "2025-04-14",
    },
    {
      Id: 12,
      EmployeeCode: "1122",
      Username: "lmorgan",
      Name: "Liam Morgan",
      Role: "Designer",
      Email: "lmorgan@example.com",
      PhoneNo: "09724896536",
      StartDate: "2024-02-08",
      ResignDate: "2025-06-26",
    },
    {
      Id: 13,
      EmployeeCode: "1123",
      Username: "mking",
      Name: "Mia King",
      Role: "Sales Executive",
      Email: "mking@example.com",
      PhoneNo: "09929037474",
      StartDate: "2024-06-02",
      ResignDate: "2025-10-22",
    },
    {
      Id: 14,
      EmployeeCode: "1124",
      Username: "nscott",
      Name: "Noah Scott",
      Role: "Developer",
      Email: "nscott@example.com",
      PhoneNo: "09850993511",
      StartDate: "2024-06-21",
      ResignDate: "2025-10-12",
    },
    {
      Id: 15,
      EmployeeCode: "1125",
      Username: "owright",
      Name: "Olivia Wright",
      Role: "Sales Executive",
      Email: "owright@example.com",
      PhoneNo: "09969510787",
      StartDate: "2024-04-25",
      ResignDate: "2025-06-30",
    },
    {
      Id: 16,
      EmployeeCode: "1126",
      Username: "pthomas",
      Name: "Paul Thomas",
      Role: "Designer",
      Email: "pthomas@example.com",
      PhoneNo: "09602962188",
      StartDate: "2024-01-06",
      ResignDate: "2025-03-13",
    },
    {
      Id: 17,
      EmployeeCode: "1127",
      Username: "qramos",
      Name: "Quinn Ramos",
      Role: "Sales Executive",
      Email: "qramos@example.com",
      PhoneNo: "09734588622",
      StartDate: "2024-06-28",
      ResignDate: "2025-02-03",
    },
    {
      Id: 18,
      EmployeeCode: "1128",
      Username: "rclark",
      Name: "Ryan Clark",
      Role: "Designer",
      Email: "rclark@example.com",
      PhoneNo: "09512491947",
      StartDate: "2024-12-21",
      ResignDate: "2025-09-30",
    },
    {
      Id: 19,
      EmployeeCode: "1129",
      Username: "ssanchez",
      Name: "Sophia Sanchez",
      Role: "Manager",
      Email: "ssanchez@example.com",
      PhoneNo: "09186159226",
      StartDate: "2024-12-19",
      ResignDate: "2025-09-15",
    },
    {
      Id: 20,
      EmployeeCode: "1130",
      Username: "tlopez",
      Name: "Tyler Lopez",
      Role: "HR",
      Email: "tlopez@example.com",
      PhoneNo: "09338542537",
      StartDate: "2024-01-27",
      ResignDate: "2025-11-05",
    },
    {
      Id: 21,
      EmployeeCode: "1131",
      Username: "umorris",
      Name: "Uma Morris",
      Role: "Manager",
      Email: "umorris@example.com",
      PhoneNo: "09706774245",
      StartDate: "2024-09-22",
      ResignDate: "2025-07-23",
    },
    {
      Id: 22,
      EmployeeCode: "1132",
      Username: "vparker",
      Name: "Victor Parker",
      Role: "HR",
      Email: "vparker@example.com",
      PhoneNo: "09983270822",
      StartDate: "2024-06-22",
      ResignDate: "2025-01-17",
    },
    {
      Id: 23,
      EmployeeCode: "1133",
      Username: "wreed",
      Name: "Wendy Reed",
      Role: "Accountant",
      Email: "wreed@example.com",
      PhoneNo: "09977891857",
      StartDate: "2024-03-27",
      ResignDate: "2025-03-26",
    },
    {
      Id: 24,
      EmployeeCode: "1134",
      Username: "xross",
      Name: "Xavier Ross",
      Role: "Sales Executive",
      Email: "xross@example.com",
      PhoneNo: "09158278488",
      StartDate: "2024-08-25",
      ResignDate: "2025-03-18",
    },
    {
      Id: 25,
      EmployeeCode: "1135",
      Username: "yprice",
      Name: "Yara Price",
      Role: "Sales Executive",
      Email: "yprice@example.com",
      PhoneNo: "09937311776",
      StartDate: "2024-08-05",
      ResignDate: "2025-05-27",
    },
    {
      Id: 26,
      EmployeeCode: "1136",
      Username: "zward",
      Name: "Zoe Ward",
      Role: "HR",
      Email: "zward@example.com",
      PhoneNo: "09512291779",
      StartDate: "2024-03-13",
      ResignDate: "2025-08-08",
    },
    {
      Id: 27,
      EmployeeCode: "1137",
      Username: "aevans",
      Name: "Adam Evans",
      Role: "Accountant",
      Email: "aevans@example.com",
      PhoneNo: "09943927242",
      StartDate: "2024-05-18",
      ResignDate: "2025-10-28",
    },
    {
      Id: 28,
      EmployeeCode: "1138",
      Username: "bgreen",
      Name: "Bella Green",
      Role: "Manager",
      Email: "bgreen@example.com",
      PhoneNo: "09278127957",
      StartDate: "2024-02-07",
      ResignDate: "2025-07-15",
    },
    {
      Id: 29,
      EmployeeCode: "1139",
      Username: "cturner",
      Name: "Chris Turner",
      Role: "Designer",
      Email: "cturner@example.com",
      PhoneNo: "09481395000",
      StartDate: "2024-02-25",
      ResignDate: "2025-06-07",
    },
    {
      Id: 30,
      EmployeeCode: "1140",
      Username: "dphillips",
      Name: "Daisy Phillips",
      Role: "Manager",
      Email: "dphillips@example.com",
      PhoneNo: "09851622798",
      StartDate: "2024-05-18",
      ResignDate: "2025-02-24",
    },
    {
      Id: 31,
      EmployeeCode: "1141",
      Username: "emurphy",
      Name: "Ethan Murphy",
      Role: "Developer",
      Email: "emurphy@example.com",
      PhoneNo: "09694160962",
      StartDate: "2024-07-01",
      ResignDate: "2025-06-25",
    },
    {
      Id: 32,
      EmployeeCode: "1142",
      Username: "fbell",
      Name: "Fiona Bell",
      Role: "Sales Executive",
      Email: "fbell@example.com",
      PhoneNo: "09798424736",
      StartDate: "2024-12-23",
      ResignDate: "2025-01-18",
    },
    {
      Id: 33,
      EmployeeCode: "1143",
      Username: "ggomez",
      Name: "Gabriel Gomez",
      Role: "Designer",
      Email: "ggomez@example.com",
      PhoneNo: "09586313600",
      StartDate: "2024-11-03",
      ResignDate: "2025-11-09",
    },
    {
      Id: 34,
      EmployeeCode: "1144",
      Username: "hcooper",
      Name: "Hazel Cooper",
      Role: "HR",
      Email: "hcooper@example.com",
      PhoneNo: "09178081012",
      StartDate: "2024-09-05",
      ResignDate: "2025-11-08",
    },
    {
      Id: 35,
      EmployeeCode: "1145",
      Username: "ijames",
      Name: "Ian James",
      Role: "Sales Executive",
      Email: "ijames@example.com",
      PhoneNo: "09706833124",
      StartDate: "2024-11-28",
      ResignDate: "2025-12-15",
    },
    {
      Id: 36,
      EmployeeCode: "1146",
      Username: "jkelley",
      Name: "Julia Kelley",
      Role: "Developer",
      Email: "jkelley@example.com",
      PhoneNo: "09142626836",
      StartDate: "2024-11-03",
      ResignDate: "2025-11-20",
    },
    {
      Id: 37,
      EmployeeCode: "1147",
      Username: "kramirez",
      Name: "Kevin Ramirez",
      Role: "Developer",
      Email: "kramirez@example.com",
      PhoneNo: "09151411087",
      StartDate: "2024-07-19",
      ResignDate: "2025-01-13",
    },
    {
      Id: 38,
      EmployeeCode: "1148",
      Username: "llawson",
      Name: "Lily Lawson",
      Role: "Accountant",
      Email: "llawson@example.com",
      PhoneNo: "09102770472",
      StartDate: "2024-07-27",
      ResignDate: "2025-02-12",
    },
    {
      Id: 39,
      EmployeeCode: "1149",
      Username: "mclarkson",
      Name: "Mason Clarkson",
      Role: "Developer",
      Email: "mclarkson@example.com",
      PhoneNo: "09349528082",
      StartDate: "2024-06-15",
      ResignDate: "2025-01-24",
    },
    {
      Id: 40,
      EmployeeCode: "1150",
      Username: "nbrooks",
      Name: "Nora Brooks",
      Role: "Developer",
      Email: "nbrooks@example.com",
      PhoneNo: "09698192031",
      StartDate: "2024-08-25",
      ResignDate: "2025-11-15",
    },
    {
      Id: 41,
      EmployeeCode: "1151",
      Username: "operez",
      Name: "Owen Perez",
      Role: "Developer",
      Email: "operez@example.com",
      PhoneNo: "09853223787",
      StartDate: "2024-11-01",
      ResignDate: "2025-05-28",
    },
    {
      Id: 42,
      EmployeeCode: "1152",
      Username: "qross",
      Name: "Quinn Ross",
      Role: "Accountant",
      Email: "qross@example.com",
      PhoneNo: "09611459125",
      StartDate: "2024-07-15",
      ResignDate: "2025-11-17",
    },
    {
      Id: 43,
      EmployeeCode: "1153",
      Username: "rriley",
      Name: "Ruby Riley",
      Role: "HR",
      Email: "rriley@example.com",
      PhoneNo: "09506206243",
      StartDate: "2024-04-02",
      ResignDate: "2025-03-13",
    },
    {
      Id: 44,
      EmployeeCode: "1154",
      Username: "sbailey",
      Name: "Sean Bailey",
      Role: "Developer",
      Email: "sbailey@example.com",
      PhoneNo: "09585719549",
      StartDate: "2024-04-17",
      ResignDate: "2025-06-09",
    },
    {
      Id: 45,
      EmployeeCode: "1155",
      Username: "tcarter",
      Name: "Tara Carter",
      Role: "HR",
      Email: "tcarter@example.com",
      PhoneNo: "09541159639",
      StartDate: "2024-10-30",
      ResignDate: "2025-02-10",
    },
    {
      Id: 46,
      EmployeeCode: "1156",
      Username: "ugriffin",
      Name: "Uriel Griffin",
      Role: "HR",
      Email: "ugriffin@example.com",
      PhoneNo: "09787368027",
      StartDate: "2024-02-22",
      ResignDate: "2025-05-04",
    },
    {
      Id: 47,
      EmployeeCode: "1157",
      Username: "vwells",
      Name: "Violet Wells",
      Role: "Designer",
      Email: "vwells@example.com",
      PhoneNo: "09120439262",
      StartDate: "2024-05-10",
      ResignDate: "2025-09-11",
    },
    {
      Id: 48,
      EmployeeCode: "1158",
      Username: "wturner",
      Name: "Wyatt Turner",
      Role: "Accountant",
      Email: "wturner@example.com",
      PhoneNo: "09116545383",
      StartDate: "2024-07-11",
      ResignDate: "2025-12-29",
    },
    {
      Id: 49,
      EmployeeCode: "1159",
      Username: "xadams",
      Name: "Xavier Adams",
      Role: "Designer",
      Email: "xadams@example.com",
      PhoneNo: "09566709866",
      StartDate: "2024-06-21",
      ResignDate: "2025-01-11",
    },
    {
      Id: 50,
      EmployeeCode: "1160",
      Username: "yyoung",
      Name: "Yvonne Young",
      Role: "Sales Executive",
      Email: "yyoung@example.com",
      PhoneNo: "09529722554",
      StartDate: "2024-06-12",
      ResignDate: "2025-10-05",
    },
  ];
  const navigate = useNavigate();
  const [data, setData] = useState(EmployeeData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(EmployeeData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = EmployeeData.slice(startIndex, startIndex + rowsPerPage);
  const totalRows = EmployeeData.length;
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToLast = () => setCurrentPage(totalPages);
  const goToFirst = () => setCurrentPage(1);
  // const handleRowClick = (EmployeeCode: string) => {
  //   navigate(`/employee/detail/${EmployeeCode}`);
  // };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig?.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    onSort({ key: column, direction });
  };
  const handleEdit = (e: React.MouseEvent, EmployeeId: number) => {
    e.stopPropagation();
    const employee = data.find((emp) => emp.Id === EmployeeId);
    if (employee) {
      navigate(`/employee/edit/${employee.Id}`, { state: { employee } });
    }
  };
  const handleDelete = (e: React.MouseEvent, EmployeeId: number) => {
    e.stopPropagation();
    setTaskToDelete(EmployeeId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    // Remove the item from the array
    setData((prevData) => prevData.filter((item) => item.Id !== taskToDelete));

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
    <div className="p-6 w-full flex-1">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-5">
        {/* Left side */}
        <p className="font-bold text-primary-400">Employee</p>

        {/* Right side (search, select, button) */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[200px] text-primary-800">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              className="focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 pl-9 text-primary-400"
            />
          </div>

          <Select>
            <SelectTrigger className="text-primary-400 ">
              <SelectValue placeholder="Role" className="font-semibold" />
            </SelectTrigger>
            <SelectContent className="bg-natural-100">
              <SelectGroup>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Accountant">Accountant</SelectItem>
                <SelectItem value="Sales Executive">Sales Executive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Link to="/employee/new">
            <Button
              variant="outline"
              className="bg-primary-400 border-none text-white flex items-center gap-1"
            >
              <Plus className="h-4 w-4 text-white" />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <Table className="w-full overflow-auto shadow-sm rounded-md">
        {/* <TableCaption>Employee List.</TableCaption> */}
        {/* <TableHeader className="bg-primary-400">
          <TableRow>
            {Object.keys(data[0]).map((columnName) => (
              <TableHead key={columnName}>
                {columnName === "id" ? "No" : capitalizeCamelCase(columnName)}
              </TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableHeader className="bg-primary-400 text-center">
          <TableHead className="px-4 py-2 font-semibold">No</TableHead>
          <TableHead className="px-4 py-2 font-semibold">
            Employee Code
          </TableHead>
          <TableHead className="px-4 py-2 font-semibold">Username</TableHead>

          {/* Sortable Name column */}
          <TableHead className="px-4 py-2 font-semibold">
            <Button
              variant="ghost"
              className=" hover:text-white hover:bg-primary-500 p-0 flex items-center gap-1"
              onClick={() => handleSort("name")}
            >
              Name
              <ArrowUpDown
                className={`h-4 w-4 transition-transform ${sortConfig?.key === "name"
                  ? sortConfig.direction === "asc"
                    ? "rotate-180"
                    : ""
                  : "opacity-50"
                  }`}
              />
            </Button>
          </TableHead>

          {/* Sortable Role column */}
          <TableHead className="px-4 py-2 font-semibold">
            <Button
              variant="ghost"
              className=" hover:text-white hover:bg-primary-500 p-0 flex items-center gap-1"
              onClick={() => handleSort("role")}
            >
              Role
              <ArrowUpDown
                className={`h-4 w-4 transition-transform ${sortConfig?.key === "role"
                  ? sortConfig.direction === "asc"
                    ? "rotate-180"
                    : ""
                  : "opacity-50"
                  }`}
              />
            </Button>
          </TableHead>

          <TableHead className="px-4 py-2 font-semibold">Email</TableHead>
          <TableHead className="px-4 py-2 font-semibold">Phone No.</TableHead>
          <TableHead className="px-4 py-2 font-semibold">Action</TableHead>
        </TableHeader>

        <TableBody>
          {currentData.map((user) => (
            <TableRow
              key={user.Id}
              className="odd:bg-primary-100 even:bg-primary-50 hover:bg-primary-200 transition-colors border-none py-3"
              onClick={() =>
                navigate(`/employee/detail/${user.Id}`, {
                  state: { employee: user },
                })
              }
            >
              {/* <TableCell>{index + 1}</TableCell> */}
              {/* <TableCell>{startIndex + index + 1}</TableCell> */}
              <TableCell>{user.Id}</TableCell>
              <TableCell>{user.EmployeeCode}</TableCell>
              <TableCell>{user.Username}</TableCell>
              {/* <TableCell>{user.Password}</TableCell>
              <TableCell>{user.Salary}</TableCell> */}
              <TableCell>{user.Name}</TableCell>
              <TableCell>{user.Role}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.PhoneNo}</TableCell>
              {/* <TableCell>
                {user.StartDate
                  ? format(new Date(user.StartDate), "yyyy-MM-dd")
                  : "-"}
              </TableCell> */}
              {/* <TableCell>
                {user.ResignDate
                  ? format(new Date(user.ResignDate), "yyyy-MM-dd")
                  : "Still employed"}
              </TableCell> */}

              <TableCell className="flex gap-4 justify-center">
                <Edit
                  className="h-4 w-4 text-black cursor-pointer hover:text-primary-500 my-auto"
                  onClick={(e) => handleEdit(e, user.Id)}
                />

                <Trash2
                  className="h-4 w-4 text-black cursor-pointer hover:text-red-500 my-auto"
                  onClick={(e) => handleDelete(e, user.Id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginations */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          {startRow}–{endRow} of {totalRows}
        </div>

        <div className="flex space-x-1">
          <button
            onClick={goToFirst}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage
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
          >
            <ChevronRight />
          </button>
          <button
            onClick={goToLast}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
          >
            <ChevronsRight />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 text-sm p-3"
          >
            {[10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
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
    </div>
  );
}
