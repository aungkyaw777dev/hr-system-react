import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { capitalizeCamelCase } from "../../lib/utils"
import {
    Edit,
    Trash2,
    FolderUp,
    Plus,
    ChevronsRight,
    ChevronsLeft,
    Search,
} from "lucide-react"
import { Input } from "../../components/ui/input"
import { Link, useNavigate } from "react-router-dom"

export default function BacklogList() {
    const navigate = useNavigate()
    const initialData = [
        { id: 1, taskCode: "PJ1234", taskName: "UI Design", assignee: "Chan Lay", projectName: "HR System" },
        { id: 2, taskCode: "PJ1235", taskName: "API Development", assignee: "Bob Smith", projectName: "HR System" },
        { id: 3, taskCode: "PJ1236", taskName: "Database Migration", assignee: "Charlie Brown", projectName: "HR System" },
        { id: 4, taskCode: "PJ1237", taskName: "Frontend Implementation", assignee: "Diana Prince", projectName: "HR System" },
        { id: 5, taskCode: "PJ1238", taskName: "Testing & QA", assignee: "Ethan White", projectName: "HR System" },
        { id: 6, taskCode: "PJ1239", taskName: "Deployment", assignee: "Fiona Green", projectName: "HR System" },
        { id: 7, taskCode: "PJ1240", taskName: "User Acceptance Testing", assignee: "George Miller", projectName: "HR System" },
        { id: 8, taskCode: "PJ1241", taskName: "Documentation", assignee: "Hannah Lee", projectName: "HR System" },
        { id: 9, taskCode: "PJ1242", taskName: "Bug Fixing", assignee: "Ian Black", projectName: "HR System" },
        { id: 10, taskCode: "PJ1243", taskName: "Code Review", assignee: "Jane Doe", projectName: "HR System" },
        { id: 11, taskCode: "PJ1244", taskName: "Performance Testing", assignee: "Kevin Hart", projectName: "HR System" },
        { id: 12, taskCode: "PJ1245", taskName: "UI Testing", assignee: "Laura King", projectName: "HR System" },
        { id: 13, taskCode: "PJ1246", taskName: "API Testing", assignee: "Michael Scott", projectName: "HR System" },
        { id: 14, taskCode: "PJ1247", taskName: "Database Testing", assignee: "Nina Patel", projectName: "HR System" },
        { id: 15, taskCode: "PJ1248", taskName: "Frontend Testing", assignee: "Oscar Wilde", projectName: "HR System" },
        { id: 16, taskCode: "PJ1249", taskName: "Backend Testing", assignee: "Paula Abdul", projectName: "HR System" },
        { id: 17, taskCode: "PJ1250", taskName: "Code Review", assignee: "Quincy Adams", projectName: "HR System" },
        { id: 18, taskCode: "PJ1251", taskName: "Internal Testing", assignee: "Rachel Green", projectName: "HR System" },
        { id: 19, taskCode: "PJ1252", taskName: "AI Model Training", assignee: "Steve Rogers", projectName: "HR System" },
        { id: 20, taskCode: "PJ1253", taskName: "Tina Fey", assignee: "Tina Fey", projectName: "HR System" },
        { id: 21, taskCode: "PJ1254", taskName: "Stakeholder Review", assignee: "Uma Thurman", projectName: "HR System" },
        { id: 22, taskCode: "PJ1255", taskName: "Testing and QA", assignee: "Victor Hugo", projectName: "HR System" },
        { id: 23, taskCode: "PJ1256", taskName: "Documentation", assignee: "Wendy Darling", projectName: "HR System" },
        { id: 24, taskCode: "PJ1257", taskName: "Frontend Implementation", assignee: "Xander Cage", projectName: "HR System" },
        { id: 25, taskCode: "PJ1258", taskName: "API Development", assignee: "Yara Shahidi", projectName: "HR System" },
        { id: 26, taskCode: "PJ1259", taskName: "Database Migration", assignee: "Zachary Levi", projectName: "HR System" },
        { id: 27, taskCode: "PJ1260", taskName: "Backend Development", assignee: "Aaron Paul", projectName: "HR System" },
        { id: 28, taskCode: "PJ1261", taskName: "Authorization", assignee: "Betty White", projectName: "HR System" },
        { id: 29, taskCode: "PJ1262", taskName: "Bug Fixing", assignee: "Carl Jung", projectName: "HR System" },
        { id: 30, taskCode: "PJ1263", taskName: "Pilot Testing", assignee: "Daisy Ridley", projectName: "HR System" },
    ]

    const [data, setData] = useState(initialData)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null)

    const totalPages = Math.ceil(data.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentData = data.slice(startIndex, startIndex + rowsPerPage)
    const totalRows = data.length
    const startRow = (currentPage - 1) * rowsPerPage + 1
    const endRow = Math.min(currentPage * rowsPerPage, totalRows)
    const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
    const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

    const handleRowClick = (taskId: number) => {
        navigate(`/backlog/${taskId}`)
    }

    const handleEdit = (e: React.MouseEvent, taskId: number) => {
        e.stopPropagation()
        navigate(`/backlog/edit/${taskId}`)
    }

    const handleDelete = (e: React.MouseEvent, taskId: number) => {
        e.stopPropagation()
        setTaskToDelete(taskId)
        setDeleteDialogOpen(true)
    }
    const confirmDelete = () => {
        // Remove the item from the array
        setData(prevData => prevData.filter(item => item.id !== taskToDelete))
        
        // Reset to page 1 if current page becomes empty
        const newTotalPages = Math.ceil((data.length - 1) / rowsPerPage)
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages)
        }
        
        // Close dialog and reset
        setDeleteDialogOpen(false)
        setTaskToDelete(null)
        
        // When connecting to API, you would call it here:
        // await deleteTaskAPI(taskToDelete)
    }

    const cancelDelete = () => {
        setDeleteDialogOpen(false)
        setTaskToDelete(null)
    }

    return (
        <div className="p-6 w-full flex-1">
            <div className="flex justify-between flex-col md:flex-row gap-2">
                <p>Backlog Group Listing</p>
                <div className="relative w-full md:w-[20%]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 pl-9"
                    />
                </div>
                <div className="flex justify-between flex-col md:flex-row gap-2">
                    <Button variant="outline"><FolderUp />Export</Button>
                    <Link to="/backlog/create"><Button variant="outline"><Plus />Create</Button></Link>
                </div>
            </div>
            <Table className="w-full overflow-auto">
                <TableCaption>Backlog Group Listing</TableCaption>
                <TableHeader>
                    <TableRow>
                        {
                            Object.keys(initialData[0]).map((columnName) => (
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
                        <TableRow 
                            key={user.id}
                            onClick={() => handleRowClick(user.id)}
                            className="odd:bg-accent even:bg-white hover:bg-accent transition-colors cursor-pointer"
                        >
                            <TableCell>{startIndex + index + 1}</TableCell>
                            <TableCell>{user.taskCode}</TableCell>
                            <TableCell>{user.taskName}</TableCell>
                            <TableCell>{user.assignee}</TableCell>
                            <TableCell>{user.projectName}</TableCell>
                            <TableCell className="flex gap-2">
                                <Edit 
                                    className="cursor-pointer hover:text-blue-600" 
                                    onClick={(e) => handleEdit(e, user.id)}
                                />
                                <Trash2 
                                    className="cursor-pointer hover:text-red-600" 
                                    onClick={(e) => handleDelete(e, user.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                    {startRow}–{endRow} of {totalRows}
                </div>

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
                            className={`px-3 py-1 rounded ${page === currentPage
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

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value))
                            setCurrentPage(1)
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

            {/* Delete Confirmation Modal */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-md">
                            <div className="flex gap-3"><Trash2 className="h-6 w-6 text-gray-600" /> Are you sure you want to delete this record?</div>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}