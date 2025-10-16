import {Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption} from "@/components/ui/table";
  import { Label } from "@/components/ui/label";


export default function Payroll() {
    return (
        <div>
            <Label className="text-2xl font-bold mb-4">Payroll</Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Payroll Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total Working Hour</TableHead>
                        <TableHead>Leave Hour</TableHead>
                        <TableHead>Gross Pay</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Map through payroll data and create table rows */}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCaption>
                            {/* Pagination controls */}
                        </TableCaption>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
