import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, ChevronDown } from "lucide-react";
import { format, parse } from "date-fns";

type PayrollRow = {
    id?: number;
    name?: string;
    payrollDate?: string;
    status?: string;
    totalHours?: number;
    leaveHours?: number;
    grossPay?: number | string;
    netPay?: number | string;
};

export default function PayrollDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const row: PayrollRow | undefined = location.state as PayrollRow | undefined;

    const initialDate: Date | undefined = useMemo(() => {
        const source = row?.payrollDate ?? "2025-10-06 08:30";
        const parsed = parse(source, "yyyy-MM-dd HH:mm", new Date());
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    }, [row]);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
    const [formData, setFormData] = useState({
        employeeCode: "EMP00123",
        employeeName: row?.name ?? "Alice",
        payrollDate: format(initialDate ?? new Date(), "yyyy-MM-dd HH:mm"),
        status: row?.status ?? "Pending",
        totalWorkingHour: (row?.totalHours ?? 8).toString(),
        actualWorkingHour: "5.0",
        leaveHour: (row?.leaveHours ?? 3).toString(),
        basicSalary: "200,000",
        allowance: "20,000",
        bonus: "30,000",
        grossPay: (row?.grossPay ?? 400000).toLocaleString?.() ?? String(row?.grossPay ?? 400000),
        deduction: "20,000",
        tax: "10%",
        netPay: (row?.netPay ?? 380000).toLocaleString?.() ?? String(row?.netPay ?? 380000),
    });

    useEffect(() => {
        // keep payrollDate string in sync if selectedDate changes externally
        if (selectedDate) {
            setFormData(prev => ({ ...prev, payrollDate: format(selectedDate, "yyyy-MM-dd HH:mm") }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: value
            };

            if (["basicSalary", "allowance", "bonus", "deduction", "tax"].includes(field)) {
                newData.netPay = calculateNetPay(newData);
            }
            return newData;
        });
    };

    const calculateNetPay = (data: typeof formData) => {
        const basicSalary = parseFloat(data.basicSalary.replace(/,/g, '')) || 0;
        const allowance = parseFloat(data.allowance.replace(/,/g, '')) || 0;
        const bonus = parseFloat(data.bonus.replace(/,/g, '')) || 0;
        const deduction = parseFloat(data.deduction.replace(/,/g, '')) || 0;
        const taxRate = parseFloat(data.tax.replace('%', '')) || 0;

        const totalGross = basicSalary + allowance + bonus;
        const taxAmount = (totalGross * taxRate) / 100;
        const netPay = totalGross - taxAmount - deduction;
        return netPay.toLocaleString();
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            setFormData(prev => ({ ...prev, payrollDate: format(date, "yyyy-MM-dd HH:mm") }));
            setIsCalendarOpen(false);
        }
    };

    const handleBack = () => {
        navigate("/payroll");
    };

    const handleUpdate = () => {
        // Submit update logic (API call placeholder)
        console.log("Updating payroll id=", id, formData);
        alert("Payroll updated successfully!");
        navigate("/payroll");
    };

    return (
        <div className="p-6 w-full flex-1">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Payroll Detail</h1>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Employee Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Employee Code
                            </label>
                            <div className="relative">
                                <Input
                                    value={formData.employeeCode}
                                    onChange={(e) => handleInputChange("employeeCode", e.target.value)}
                                    className="pr-8"
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Payroll Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payroll Date
                            </label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <div className="relative">
                                        <Input
                                            value={formData.payrollDate}
                                            onChange={(e) => handleInputChange("payrollDate", e.target.value)}
                                            className="pr-8 cursor-pointer"
                                            readOnly
                                        />
                                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white" align="end">
                                    <CalendarComponent
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateSelect}
                                        className="bg-white"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Total Working Hour */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Working Hour
                            </label>
                            <Input
                                value={formData.totalWorkingHour}
                                onChange={(e) => handleInputChange("totalWorkingHour", e.target.value)}
                            />
                        </div>

                        {/* Actual Working Hour */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Actual Working Hour
                            </label>
                            <Input
                                value={formData.actualWorkingHour}
                                onChange={(e) => handleInputChange("actualWorkingHour", e.target.value)}
                            />
                        </div>

                        {/* Allowance */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Allowance
                            </label>
                            <Input
                                value={formData.allowance}
                                onChange={(e) => handleInputChange("allowance", e.target.value)}
                            />
                        </div>

                        {/* Gross Pay */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gross Pay
                            </label>
                            <Input
                                value={formData.grossPay}
                                onChange={(e) => handleInputChange("grossPay", e.target.value)}
                            />
                        </div>

                        {/* Tax */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tax
                            </label>
                            <Select value={formData.tax} onValueChange={(value) => handleInputChange("tax", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="5%">5%</SelectItem>
                                    <SelectItem value="10%">10%</SelectItem>
                                    <SelectItem value="15%">15%</SelectItem>
                                    <SelectItem value="20%">20%</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Employee Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Employee Name
                            </label>
                            <Input
                                value={formData.employeeName}
                                onChange={(e) => handleInputChange("employeeName", e.target.value)}
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Complete">Complete</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Leave Hour */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Leave Hour
                            </label>
                            <Input
                                value={formData.leaveHour}
                                onChange={(e) => handleInputChange("leaveHour", e.target.value)}
                            />
                        </div>

                        {/* Basic Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Basic Salary
                            </label>
                            <Input
                                value={formData.basicSalary}
                                onChange={(e) => handleInputChange("basicSalary", e.target.value)}
                            />
                        </div>

                        {/* Bonus */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bonus
                            </label>
                            <Input
                                value={formData.bonus}
                                onChange={(e) => handleInputChange("bonus", e.target.value)}
                            />
                        </div>

                        {/* Deduction */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deduction
                            </label>
                            <Input
                                value={formData.deduction}
                                onChange={(e) => handleInputChange("deduction", e.target.value)}
                            />
                        </div>

                        {/* Net Pay */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Net Pay
                            </label>
                            <Input
                                value={formData.netPay}
                                onChange={(e) => handleInputChange("netPay", e.target.value)}
                                className="bg-gray-100"
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                        BACK
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleUpdate}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                        UPDATE
                    </Button>
                </div>
            </div>
        </div>
    );
}


