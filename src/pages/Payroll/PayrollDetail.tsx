import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    useParams();
    const location = useLocation();
    const row: PayrollRow | undefined = location.state as PayrollRow | undefined;

    const initialDate: Date | undefined = useMemo(() => {
        const source = row?.payrollDate ?? "2025-10-06 08:30";
        const parsed = parse(source, "yyyy-MM-dd HH:mm", new Date());
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    }, [row]);

    const [selectedDate] = useState<Date | undefined>(initialDate);
    const [formData] = useState({
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
        // noop in read-only view; ensure date is formatted once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const handleBack = () => {
        navigate("/payroll");
    };

    const Field = ({ label, value }: { label: string; value?: string }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="h-9 w-full rounded-md bg-gray-100 text-gray-700 px-3 flex items-center">
                <span className="truncate">{value ?? "-"}</span>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8 w-full flex-1 bg-gray-50">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Payroll Detail</h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <Field label="Employee Code" value={formData.employeeCode} />
                        <Field label="Payroll Date" value={formData.payrollDate} />
                        <Field label="Total Working Hour" value={formData.totalWorkingHour} />
                        <Field label="Actual Working Hour" value={formData.actualWorkingHour} />
                        <Field label="Allowance" value={formData.allowance} />
                        <Field label="Gross Pay" value={formData.grossPay} />
                        <Field label="Tax" value={formData.tax} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <Field label="Employee Name" value={formData.employeeName} />
                        <Field label="Status" value={formData.status} />
                        <Field label="Leave Hour" value={formData.leaveHour} />
                        <Field label="Basic Salary" value={formData.basicSalary} />
                        <Field label="Bonus" value={formData.bonus} />
                        <Field label="Deduction" value={formData.deduction} />
                        <Field label="Net Pay" value={formData.netPay} />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 md:gap-4 mt-8 pt-6 border-t">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                        BACK
                    </Button>
                </div>
            </div>
        </div>
    );
}


