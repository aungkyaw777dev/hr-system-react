import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { capitalizeCamelCase } from "../../lib/utils"
import {
    Edit,
    Trash2,
    FolderUp,
    Plus,
    ChevronsRight,
    ChevronsLeft,
    Search,
    ChevronLeft
} from "lucide-react"
import { Input } from "../../components/ui/input"


export default function PayrollList() {
    const navigate = useNavigate();
    const [data] = useState([
  { id: 1, name: "Aung Min", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 8.0, grossPay: 400000, netPay: 380000 },
  { id: 2, name: "Thiri Kyaw", payrollDate: "2025-09-30", status: "Complete", totalHours: 160.0, leaveHours: 9.5, grossPay: 380000, netPay: 355000 },
  { id: 3, name: "Min Thu", payrollDate: "2025-09-30", status: "Pending", totalHours: 170.0, leaveHours: 25.0, grossPay: 390000, netPay: 340000 },
  { id: 4, name: "Hla Hla Win", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 16.0, grossPay: 400000, netPay: 370000 },
  { id: 5, name: "Kyaw Soe", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 6.0, grossPay: 420000, netPay: 405000 },
  { id: 6, name: "Moe Sandar", payrollDate: "2025-09-30", status: "Pending", totalHours: 168.0, leaveHours: 16.0, grossPay: 390000, netPay: 360000 },
  { id: 7, name: "Nyein Chan", payrollDate: "2025-09-30", status: "Complete", totalHours: 160.0, leaveHours: 12.0, grossPay: 385000, netPay: 360000 },
  { id: 8, name: "Su Mon", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 21.0, grossPay: 410000, netPay: 375000 },
  { id: 9, name: "Zaw Htet", payrollDate: "2025-09-30", status: "Pending", totalHours: 176.0, leaveHours: 6.0, grossPay: 420000, netPay: 400000 },
  { id: 10, name: "Thandar Lwin", payrollDate: "2025-09-30", status: "Complete", totalHours: 168.0, leaveHours: 8.0, grossPay: 400000, netPay: 380000 },
  { id: 11, name: "Aye Chan", payrollDate: "2025-09-30", status: "Pending", totalHours: 172.0, leaveHours: 10.0, grossPay: 395000, netPay: 370000 },
  { id: 12, name: "Tun Tun", payrollDate: "2025-09-30", status: "Complete", totalHours: 178.0, leaveHours: 4.0, grossPay: 430000, netPay: 420000 },
  { id: 13, name: "Myo Myint", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 8.0, grossPay: 410000, netPay: 390000 },
  { id: 14, name: "Hnin Ei Mon", payrollDate: "2025-09-30", status: "Complete", totalHours: 160.0, leaveHours: 12.0, grossPay: 380000, netPay: 355000 },
  { id: 15, name: "Khin Thidar", payrollDate: "2025-09-30", status: "Pending", totalHours: 168.0, leaveHours: 15.0, grossPay: 385000, netPay: 350000 },
  { id: 16, name: "Nandar Aung", payrollDate: "2025-09-30", status: "Complete", totalHours: 174.0, leaveHours: 6.0, grossPay: 415000, netPay: 400000 },
  { id: 17, name: "Pyae Sone", payrollDate: "2025-09-30", status: "Pending", totalHours: 170.0, leaveHours: 18.0, grossPay: 390000, netPay: 360000 },
  { id: 18, name: "May Zin", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 9.0, grossPay: 400000, netPay: 380000 },
  { id: 19, name: "Ko Ko", payrollDate: "2025-09-30", status: "Pending", totalHours: 162.0, leaveHours: 20.0, grossPay: 385000, netPay: 350000 },
  { id: 20, name: "Ei Mon", payrollDate: "2025-09-30", status: "Complete", totalHours: 178.0, leaveHours: 6.0, grossPay: 410000, netPay: 395000 },
  { id: 21, name: "Htet Aung", payrollDate: "2025-09-30", status: "Complete", totalHours: 174.0, leaveHours: 8.0, grossPay: 400000, netPay: 385000 },
  { id: 22, name: "Wint Wint", payrollDate: "2025-09-30", status: "Pending", totalHours: 166.0, leaveHours: 14.0, grossPay: 390000, netPay: 360000 },
  { id: 23, name: "Aye Thandar", payrollDate: "2025-09-30", status: "Complete", totalHours: 180.0, leaveHours: 4.0, grossPay: 430000, netPay: 420000 },
  { id: 24, name: "Lin Htet", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 10.0, grossPay: 420000, netPay: 400000 },
  { id: 25, name: "Moe Moe", payrollDate: "2025-09-30", status: "Pending", totalHours: 168.0, leaveHours: 18.0, grossPay: 395000, netPay: 365000 },
  { id: 26, name: "Zin Mar", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 8.0, grossPay: 410000, netPay: 390000 },
  { id: 27, name: "Thet Naing", payrollDate: "2025-09-30", status: "Complete", totalHours: 174.0, leaveHours: 6.0, grossPay: 420000, netPay: 405000 },
  { id: 28, name: "Khaing Min", payrollDate: "2025-09-30", status: "Pending", totalHours: 160.0, leaveHours: 22.0, grossPay: 385000, netPay: 345000 },
  { id: 29, name: "Soe Htet", payrollDate: "2025-09-30", status: "Complete", totalHours: 178.0, leaveHours: 5.0, grossPay: 415000, netPay: 400000 },
  { id: 30, name: "Mya Hla", payrollDate: "2025-09-30", status: "Complete", totalHours: 176.0, leaveHours: 9.0, grossPay: 400000, netPay: 380000 },
]);

    // const [deleteOpen, setDeleteOpen] = useState(false);
    // const [selectedId, setSelectedId] = useState<number | null>(null);
    // const [selectedName, setSelectedName] = useState<string | undefined>(undefined);

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const totalPages = Math.ceil(data.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentData = data.slice(startIndex, startIndex + rowsPerPage)
    const totalRows = data.length
    const startRow = (currentPage - 1) * rowsPerPage + 1;
    const endRow = Math.min(currentPage * rowsPerPage, totalRows);
    const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const goToLast = () => setCurrentPage(totalPages);
    const goToFirst = () => setCurrentPage(1)
    // const requestDelete = (row: { id: number; name: string }) => {
    //     setSelectedId(row.id)
    //     setSelectedName(row.name)
    //     setDeleteOpen(true)
    // }

    // const confirmDelete = () => {
    //     if (selectedId == null) return
    //     setData(prev => prev.filter(r => r.id !== selectedId))
    //     // adjust pagination if current page becomes empty
    //     const newTotal = data.length - 1
    //     const newTotalPages = Math.max(1, Math.ceil(newTotal / rowsPerPage))
    //     if (currentPage > newTotalPages) setCurrentPage(newTotalPages)
    //     setDeleteOpen(false)
    //     setSelectedId(null)
    //     setSelectedName(undefined)
    // }

    // const cancelDelete = () => {
    //     setDeleteOpen(false)
    //     setSelectedId(null)
    //     setSelectedName(undefined)
    // }

    return (
        <div className="p-6 w-full flex-1">
            <div className="flex justify-between flex-col md:flex-row gap-2 mb-4">
                <p>Payroll</p>
                {/* date picker */}
                {/* <div className="grid gap-2">
                    <Popover >
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal w-[250px]",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <Calendar1Icon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")}/{format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-primary text-white" align="start">
                            <Calendar
                                mode="range"
                                selected={date}
                                onSelect={(dateRange) => setDate({from: dateRange?.from, to: dateRange?.to})}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div> */}

                {/* search */}
                <div className="relative w-full md:w-[20%] text-primary-800">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-800 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 pl-9"// Add left padding so text doesn’t overlap the icon
                    />
                </div>
                {/* buttons */}
                <Button className="outline-btn"><FolderUp />Export</Button>
                <Button className="outline-btn" onClick={() => navigate("/payroll/create")}><Plus />Add new</Button>
            </div>
            <Table className="w-full overflow-auto shadow-sm rounded-md">
                {/* <TableCaption>Attendance List.</TableCaption> */}
                <TableHeader className="bg-primary-300">
                    <TableRow className="border-none">
                        {
                            Object.keys(data[0]).map((columnName) => (
                                <TableHead key={columnName}>{
                                    columnName === 'id' ? "No" : capitalizeCamelCase(columnName)
                                }</TableHead>
                            ))
                        }
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((user, index) => (
                        <TableRow key={index}
                            className="odd:bg-primary-100 even:bg-primary-50 hover:bg-primary-200 transition-colors border-none py-3"
                            onClick={() => navigate(`/payroll/${user.id}/detail`, { state: user })}
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.payrollDate}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.totalHours}</TableCell>
                            <TableCell>{user.leaveHours}</TableCell>
                            <TableCell>{user.grossPay}</TableCell>
                            <TableCell>{user.netPay}</TableCell>
                            <TableCell className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/payroll/${user.id}/edit`, { state: user })}
                                    className="text-primary-500 cursor-pointer"
                                    aria-label="Edit"
                                >
                                    <Edit />
                                </button>
                                <button
                                    className="text-error-400 cursor-pointer"
                                    aria-label="Delete"
                                >
                                    <Trash2 />
                                </button>
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
                        onClick={goToFirst}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
                    >
                        <ChevronsLeft />
                    </button>
                    <button
                        onClick={goPrev}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
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
                        <ChevronsRight />
                    </button>
                    <button
                        onClick={goToLast}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
                    >
                        <ChevronsRight />
                    </button>
                </div>

                {/* Right: Rows per page */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Rows/page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1); // reset page
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
            {/* Delete confirmation */}
            {/* <PayrollDelete
                open={deleteOpen}
                employeeName={selectedName}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            /> */}
        </div >
    )
}
