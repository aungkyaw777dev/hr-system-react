"use client";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Employee {
  employeeCode: string;
  username: string;
  password?: string;
  salary: number;
  name: string;
  roleCode: "ADMIN" | "HR" | "CEO" | "Viewer" | "Editor";
  email: string;
  phoneNo: string;
  startDate: string;
  resignDate: string;
}

export default function EmployeeDetail() {
  const { EmployeeCode } = useParams<{ EmployeeCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (location.state?.employee) {
      setEmployee(location.state.employee);
    }
  }, [location.state]);

  const handleBack = () => navigate("/employee");

  if (!employee) {
    return (
      <p className="p-6 text-center text-gray-500">
        No employee data available.
      </p>
    );
  }

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary-500">
        Employee Detail
      </h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Employee Code */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Employee Code
            </label>
            <Input value={employee.employeeCode} disabled readOnly />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium text-sm">Username</label>
            <Input value={employee.username} disabled readOnly />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-sm">Password</label>
            <Input
              type="password"
              value={employee.password}
              disabled
              readOnly
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 font-medium text-sm">Salary</label>
            <Input value={employee.salary} disabled readOnly />
          </div>
          {console.log("EmployeeSalary:", employee.salary)}
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-sm">Name</label>
            <Input value={employee.name} disabled readOnly />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium text-sm">Role</label>
            <Select value={employee.roleCode} disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50">
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <Input value={employee.email} disabled readOnly />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium text-sm">Phone No.</label>
            <Input value={employee.phoneNo} disabled readOnly />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-1 font-medium text-sm">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-full"
                  disabled
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {employee.startDate
                    ? format(new Date(employee.startDate), "PPP")
                    : "No date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    employee.startDate
                      ? new Date(employee.startDate)
                      : undefined
                  }
                  disabled
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Resign Date */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Resign Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-full"
                  disabled
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {employee.resignDate
                    ? format(new Date(employee.resignDate), "PPP")
                    : "No date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    employee.resignDate
                      ? new Date(employee.resignDate)
                      : undefined
                  }
                  disabled
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Back button */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
          <Button
            variant="outline"
            className="w-full sm:w-auto text-white bg-primary-500"
            onClick={handleBack}
            type="button"
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
