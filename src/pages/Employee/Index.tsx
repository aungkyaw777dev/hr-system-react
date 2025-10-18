import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { format } from "date-fns";

import { Button } from "../../components/ui/button";
import { capitalizeCamelCase } from "../../lib/utils";
import { Edit, Trash2, Plus, ChevronsRight, ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const data = [
    {
      id: 1,
      code: "EMP001",
      photo: "aa.jpg",
      name: "Alice Johnson",
      role: "Manager",
      email: "alice.johnson@example.com",
      phoneNo: "555-0101",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 2,
      code: "EMP002",
      photo: "ab.jpg",
      name: "Bob Smith",
      role: "Director",
      email: "bob.smith@example.com",
      phoneNo: "555-0102",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 3,
      code: "EMP003",
      photo: "ac.jpg",
      name: "Carol Davis",
      role: "Executive",
      email: "carol.davis@example.com",
      phoneNo: "555-0103",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 4,
      code: "EMP004",
      photo: "ad.jpg",
      name: "Daniel Lee",
      role: "Receptionist",
      email: "daniel.lee@example.com",
      phoneNo: "555-0104",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 5,
      code: "EMP005",
      photo: "ae.jpg",
      name: "Emily Brown",
      role: "Operation",
      email: "emily.brown@example.com",
      phoneNo: "555-0105",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 6,
      code: "EMP006",
      photo: "af.jpg",
      name: "Frank Wilson",
      role: "Sales",
      email: "frank.wilson@example.com",
      phoneNo: "555-0106",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 7,
      code: "EMP007",
      photo: "ag.jpg",
      name: "Grace Miller",
      role: "Office Staff",
      email: "grace.miller@example.com",
      phoneNo: "555-0107",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 8,
      code: "EMP008",
      photo: "ah.jpg",
      name: "Henry Martinez",
      role: "Cleaning staff",
      email: "henry.martinez@example.com",
      phoneNo: "555-0108",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 9,
      code: "EMP009",
      photo: "ai.jpg",
      name: "Irene Thomas",
      role: "IT",
      email: "irene.thomas@example.com",
      phoneNo: "555-0109",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 10,
      code: "EMP010",
      photo: "aj.jpg",
      name: "Jack Anderson",
      role: "Manager",
      email: "jack.anderson@example.com",
      phoneNo: "555-0110",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 11,
      code: "EMP011",
      photo: "ak.jpg",
      name: "Karen Taylor",
      role: "Director",
      email: "karen.taylor@example.com",
      phoneNo: "555-0111",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 12,
      code: "EMP012",
      photo: "al.jpg",
      name: "Liam Hernandez",
      role: "Executive",
      email: "liam.hernandez@example.com",
      phoneNo: "555-0112",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 13,
      code: "EMP013",
      photo: "am.jpg",
      name: "Mia Moore",
      role: "Receptionist",
      email: "mia.moore@example.com",
      phoneNo: "555-0113",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 14,
      code: "EMP014",
      photo: "an.jpg",
      name: "Noah Jackson",
      role: "Operation",
      email: "noah.jackson@example.com",
      phoneNo: "555-0114",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 15,
      code: "EMP015",
      photo: "ao.jpg",
      name: "Olivia White",
      role: "Sales",
      email: "olivia.white@example.com",
      phoneNo: "555-0115",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 16,
      code: "EMP016",
      photo: "ap.jpg",
      name: "Paul Harris",
      role: "Office Clear",
      email: "paul.harris@example.com",
      phoneNo: "555-0116",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 17,
      code: "EMP017",
      photo: "aq.jpg",
      name: "Quinn Lewis",
      role: "Cleaning staff",
      email: "quinn.lewis@example.com",
      phoneNo: "555-0117",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 18,
      code: "EMP018",
      photo: "ar.jpg",
      name: "Ryan Clark",
      role: "IT",
      email: "ryan.clark@example.com",
      phoneNo: "555-0118",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 19,
      code: "EMP019",
      photo: "as.jpg",
      name: "Sophia Walker",
      role: "Manager",
      email: "sophia.walker@example.com",
      phoneNo: "555-0119",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 20,
      code: "EMP020",
      photo: "at.jpg",
      name: "Thomas Hall",
      role: "Director",
      email: "thomas.hall@example.com",
      phoneNo: "555-0120",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 21,
      code: "EMP021",
      photo: "au.jpg",
      name: "Uma Allen",
      role: "Executive",
      email: "uma.allen@example.com",
      phoneNo: "555-0121",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 22,
      code: "EMP022",
      photo: "av.jpg",
      name: "Victor Young",
      role: "Receptionist",
      email: "victor.young@example.com",
      phoneNo: "555-0122",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 23,
      code: "EMP023",
      photo: "aw.jpg",
      name: "Wendy Scott",
      role: "Operation",
      email: "wendy.scott@example.com",
      phoneNo: "555-0123",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 24,
      code: "EMP024",
      photo: "ax.jpg",
      name: "Xavier King",
      role: "Sales",
      email: "xavier.king@example.com",
      phoneNo: "555-0124",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 25,
      code: "EMP025",
      photo: "ay.jpg",
      name: "Yara Green",
      role: "Office Clear",
      email: "yara.green@example.com",
      phoneNo: "555-0125",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 26,
      code: "EMP026",
      photo: "az.jpg",
      name: "Zack Adams",
      role: "Cleaning staff",
      email: "zack.adams@example.com",
      phoneNo: "555-0126",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 27,
      code: "EMP027",
      photo: "ba.jpg",
      name: "Ava Brooks",
      role: "IT",
      email: "ava.brooks@example.com",
      phoneNo: "555-0127",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 28,
      code: "EMP028",
      photo: "bb.jpg",
      name: "Ben Rivera",
      role: "Manager",
      email: "ben.rivera@example.com",
      phoneNo: "555-0128",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 29,
      code: "EMP029",
      photo: "bc.jpg",
      name: "Chloe Price",
      role: "Director",
      email: "chloe.price@example.com",
      phoneNo: "555-0129",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
    {
      id: 30,
      code: "EMP030",
      photo: "bd.jpg",
      name: "Daisy Ridley",
      role: "Executive",
      email: "daisy.ridley@example.com",
      phoneNo: "555-0130",
      startDate: new Date("2024-01-01"),
      resignDate: new Date("2024-12-31"),
    },
  ];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);
  const totalRows = data.length;
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  return (
    <div className="p-6 w-full flex-1">
      <div className="flex justify-between flex-col md:flex-row gap-2">
        <p className="font-bold">Employee</p>

        <Link to="/employee/new">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </Link>
      </div>
      <Table className="w-full overflow-auto">
        <TableCaption>Attendance List.</TableCaption>
        <TableHeader>
          <TableRow>
            {Object.keys(data[0]).map((columnName) => (
              <TableHead key={columnName}>
                {columnName === "id" ? "No" : capitalizeCamelCase(columnName)}
              </TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((user, index) => (
            <TableRow
              key={index}
              className="odd:bg-accent even:bg-white hover:bg-accent transition-colors"
              onClick={() =>
                navigate(`/employee/view/${user.code}`, {
                  state: { employee: user },
                })
              }
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.code}</TableCell>
              <TableCell>{user.photo}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNo}</TableCell>
              <TableCell>{format(user.startDate, "yyyy-MM-dd")}</TableCell>
              <TableCell>{format(user.resignDate, "yyyy-MM-dd")}</TableCell>

              <TableCell className="flex items-center space-x-2">
                <Link
                  to={`/employee/edit/${user.code}`}
                  state={{ employee: user }}
                >
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                </Link>

                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginations */}
      <div className="flex items-center justify-between p-4 border-t">
        {/* Left: Showing rows */}
        <div className="text-sm text-muted-foreground">
          {startRow}–{endRow} of {totalRows}
        </div>

        {/* Middle: Page buttons */}

        <div className="flex space-x-1">
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronsLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronsRight />
          </button>
        </div>

        {/* Right: Rows per page */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset page
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
