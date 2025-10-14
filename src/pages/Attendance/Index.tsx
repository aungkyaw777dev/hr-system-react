import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { capitalizeCamelCase } from "../../lib/utils"
import { Edit, Trash2, FolderUp, Plus, ChevronsRight, ChevronLeft, Search, Calendar1Icon } from "lucide-react"
import { Input } from "../../components/ui/input"

export default function AttendanceList() {
    const data = [
        { id: 1, name: "Alice Johnson", checkinTime: "09:00 AM", checkoutTime: "05:00 PM", date: "2025-10-01", workingHours: "8h", status: "Present" },
        { id: 2, name: "Bob Smith", checkinTime: "09:15 AM", checkoutTime: "05:10 PM", date: "2025-10-01", workingHours: "7h 55m", status: "Present" },
        { id: 3, name: "Charlie Brown", checkinTime: "-", checkoutTime: "-", date: "2025-10-01", workingHours: "0h", status: "Absent" },
        { id: 4, name: "Diana Prince", checkinTime: "09:05 AM", checkoutTime: "04:55 PM", date: "2025-10-01", workingHours: "7h 50m", status: "Present" },
        { id: 5, name: "Ethan White", checkinTime: "09:45 AM", checkoutTime: "04:30 PM", date: "2025-10-01", workingHours: "6h 45m", status: "Late" },
        { id: 6, name: "Fiona Green", checkinTime: "08:50 AM", checkoutTime: "05:00 PM", date: "2025-10-01", workingHours: "8h 10m", status: "Present" },
        { id: 7, name: "George Miller", checkinTime: "-", checkoutTime: "-", date: "2025-10-01", workingHours: "0h", status: "Absent" },
        { id: 8, name: "Hannah Lee", checkinTime: "09:10 AM", checkoutTime: "05:05 PM", date: "2025-10-01", workingHours: "7h 55m", status: "Present" },
        { id: 9, name: "Ian Black", checkinTime: "09:30 AM", checkoutTime: "04:40 PM", date: "2025-10-01", workingHours: "7h 10m", status: "Late" },
        { id: 10, name: "Jane Doe", checkinTime: "09:00 AM", checkoutTime: "05:00 PM", date: "2025-10-01", workingHours: "8h", status: "Present" },
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const [date, setDate] = useState<{
        from: Date | undefined
        to: Date | undefined
    }>({ from: undefined, to: undefined })
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentData = data.slice(startIndex, startIndex + itemsPerPage)

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1)
    }

    return (
        <div className="p-6 w-full flex-1">
            <div className="flex justify-between flex-col md:flex-row gap-2">
                <p>Attendance</p>
                <div className="grid gap-2">
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
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="relative w-full md:w-[20%]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 pl-9"// Add left padding so text doesn’t overlap the icon
                    />
                </div>
                <Button variant="outline"><FolderUp />Export</Button>
                <Button variant="outline"><Plus />Add new</Button>
            </div>
            <Table className="w-full overflow-auto">
                <TableCaption>Attendance List.</TableCaption>
                <TableHeader>
                    <TableRow >
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
                            className="odd:bg-accent even:bg-white hover:bg-accent transition-colors"
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.checkinTime}</TableCell>
                            <TableCell>{user.checkoutTime}</TableCell>
                            <TableCell>{user.date}</TableCell>
                            <TableCell>{user.workingHours}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell className="flex ">
                                <Edit />
                                <Trash2 />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-center mt-4">
                <Button
                    variant="outline"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft />
                </Button>

                <span className="text-sm text-muted-foreground">
                    {currentPage}/{totalPages}
                </span>

                <Button
                    variant="outline"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight />
                </Button>
            </div>
        </div >
    )
}
