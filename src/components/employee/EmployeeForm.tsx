"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

export default function EmployeeForm({
  onSubmit: propsOnSubmit,
  onCancel: propsOnCancel,
}: {
  onSubmit?: (values: unknown) => void;
  onCancel?: () => void;
}) {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCancel = () => {
    if (propsOnCancel) return propsOnCancel();
    navigate("/employee");
  };

  const employeeSchema = z.object({
    EmployeeCode: z
      .string()
      .min(1, "EmployeeCode is required")
      .regex(/^\d+$/, "EmployeeCode must be numeric"),

    Username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters"),

    Password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at most 15 characters"),

    Salary: z
      .number()
      .positive("Salary must be a positive number")
      .max(10000000, "Salary too high"),

    Name: z.string().min(2, "Name is required").max(60, "Name too long"),

    Role: z.string(),
    Email: z.string().email("Invalid email address"),

    PhoneNo: z
      .string()
      .regex(/^09\d{9}$/, "Phone number must start with 09 and have 11 digits"),

    StartDate: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "StartDate must be a valid date"
      ),

    ResignDate: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "ResignDate must be a valid date"
      ),
  });

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      EmployeeCode: "",
      Username: "",
      Password: "",
      Salary: 0,
      Name: "",
      Role: "",
      Email: "",
      PhoneNo: "",
      StartDate: "",
      ResignDate: "",
    },
  });

  const employeeFromState = location.state?.employee;

  useEffect(() => {
    if (employeeFromState) {
      form.reset({
        EmployeeCode: employeeFromState.EmployeeCode ?? "",
        Username: employeeFromState.Username ?? "",
        Password: "",
        Name: employeeFromState.Name ?? "",
        Salary: employeeFromState.Salary ?? 0,
        Role: employeeFromState.Role ?? "Developer",
        Email: employeeFromState.Email ?? "",
        PhoneNo: employeeFromState.PhoneNo ?? "",
        StartDate: employeeFromState.StartDate ?? "",
        ResignDate: employeeFromState.ResignDate ?? "",
      });
    }
  }, [employeeFromState, form]);

  function handleFormSubmit(values: z.infer<typeof employeeSchema>) {
    if (code) {
      console.log("Updating employee:", code, values);
      // prefer caller-provided submit handler
      if (propsOnSubmit) return propsOnSubmit(values);
      // API call to update employee by code
      navigate("/employee");
    } else {
      console.log("Creating new employee:", values);
      if (propsOnSubmit) return propsOnSubmit(values);
      // API call to create a new employee
      navigate("/employee");
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <div className="flex-1 p-6 bg-natural-100">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-primary-500">
        {code ? "Employee Edit" : "Employee Create"}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          onReset={onReset}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Employee Code */}
            <FormField
              control={form.control}
              name="EmployeeCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="Username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <FormField
              control={form.control}
              name="Salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter salary amount"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Name */}
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="Role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-50">
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Accountant">Accountant</SelectItem>
                        <SelectItem value="Sales Executive">
                          Sales Executive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="PhoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="StartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start text-left font-normal w-full"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-natural-50">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString() ?? "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resign Date */}
            <FormField
              control={form.control}
              name="ResignDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resign Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start text-left font-normal w-full"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-natural-50">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString() ?? "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <Button
              type="reset"
              variant="outline"
              className="w-full sm:w-auto text-primary-500"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="w-full sm:w-auto bg-primary-500 border-0 text-white"
            >
              {code ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
