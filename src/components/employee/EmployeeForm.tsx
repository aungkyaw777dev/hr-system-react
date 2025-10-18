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

export default function EmployeeForm() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const formSchema = z
    .object({
      code: z
        .string()
        .min(3, "Code must be at least 3 characters")
        .max(20, "Code must be less than 20 characters")
        .regex(
          /^[A-Za-z0-9_-]+$/,
          "Code can only contain letters, numbers, underscores, or hyphens"
        ),

      photo: z.string().url("Photo must be a valid URL"),

      name: z
        .string()
        .min(6, "Name must be at least 6 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

      role: z.string().min(1, "Please choose a role"),

      email: z.string().email("Invalid email address"),

      phone: z
        .string()
        .regex(
          /^\+?[0-9]{10,15}$/,
          "Phone number must be valid and contain 10–15 digits"
        ),

      startDate: z.date().optional(),

      resignDate: z.date().optional(),
    })
    .refine(
      (data) => {
        if (data.startDate && data.resignDate) {
          return data.resignDate >= data.startDate;
        }
        return true;
      },
      {
        message: "End date must be after start date",
        path: ["endDate"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      photo: "",
      name: "",
      role: "",
      email: "",
      phone: "",
      startDate: undefined,
      resingDate: undefined,
    },
  });

  const employeeFromState = location.state?.employee;
  useEffect(() => {
    if (employeeFromState) {
      form.reset({
        code: employeeFromState.code,
        photo: employeeFromState.photo,
        name: employeeFromState.name,
        role: employeeFromState.role,
        email: employeeFromState.email,
        phone: employeeFromState.phoneNo,
        startDate: employeeFromState.startDate,
        resingDate: employeeFromState.endDate,
      });
    }
  }, [employeeFromState]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (code) {
      console.log("Updating employee:", code, values);
      // API call to update employee by code
      navigate("/employee");
    } else {
      console.log("Creating new employee:", values);
      // API call to create a new employee
      navigate("/employee");
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        {code ? "Edit Employee" : "Create Employee"}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={onReset}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Employee Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter employee code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photo */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input placeholder="Photo URL or filename" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-50">
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Operation">Operation</SelectItem>
                        <SelectItem value="Receptionist">
                          Receptionist
                        </SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Office Staff">
                          Office Staff
                        </SelectItem>
                        <SelectItem value="Cleaning Staff">
                          Cleaning Staff
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
              name="email"
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
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
              name="startDate"
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
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="resingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resing Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start text-left font-normal w-full"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
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
            <Button type="reset" variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="w-full sm:w-auto"
            >
              {code ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
