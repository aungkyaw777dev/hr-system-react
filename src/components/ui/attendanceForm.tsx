"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "./calendar"
import { ChevronDownIcon, Clock } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

const formSchema = z.object({
    employeeCode: z.string().nonempty("Employee Code cannot be empty!"),
    employeeName: z.string().nonempty("Employee Name cannot be empty"),
    checkinLocation: z.string().nonempty("Check In location cannot be empty!"),
    checkoutLocation: z.string().nonempty("Check out location cannot be empty!"),
    checkinTime: z.string().nonempty("Checkin Time cannot be empty!"),
    checkoutTime: z.string().nonempty("Checkout Time cannot be empty!"),
    workingHour: z.number().min(0, "Working hour cannot be negative").max(24, "Too many hours"),
    status: z.string().nonempty("Status cannot be empty"),
    date: z.date(),
    remark: z.string()
});
export default function AttendanceForm() {

    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeCode: "Emp001",
            employeeName: "Aung Min",
            checkinLocation: "",
            checkoutLocation: "",
            checkinTime: "",
            checkoutTime: "",
            workingHour: 0,
            status: "",
            date: new Date(),
            remark: ""
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };
    return (
        <div className="w-full">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full p-2 mt-4">
                    <div className="w-full flex flex-col md:flex-row gap-3">
                        <p className="ms-8 text-bold text-xl">Add New Attendance</p>

                        <div className="w-full md:w-[30%] flex gap-4 flex-col">
                            <FormField
                                control={form.control}
                                name="employeeCode"
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
                            <FormField
                                control={form.control}
                                name="checkinLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Checkin Location</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="checkoutLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Checkout Location</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /><FormField
                                control={form.control}
                                name="workingHour"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Working Hour</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full md:w-[30%] flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="employeeName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-48 justify-between font-normal"
                                                >
                                                    {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    captionLayout="dropdown"
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-3">
                                <FormField
                                    control={form.control}
                                    name="checkinTime"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>CheckinTime</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start font-normal">
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        {field.value ? field.value : "Select time"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-4 bg-natural-50 justify-start">
                                                    <input
                                                        type="time"
                                                        value={field.value || ""}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        className="border rounded-md p-2"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="checkoutTime"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>CheckoutTime</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start font-normal">
                                                    <Clock className="mr-2 h-4 w-4" />
                                                    {field.value ? field.value : "Select time"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-4 bg-natural-50 justify-start">
                                                <input
                                                    type="time"
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    className="border rounded-md p-2"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field} // ⬅️ this spreads onChange, value, ref automatically
                                                className="border rounded-md p-2 w-[180px]"
                                            >
                                                <option value="">Select status</option>
                                                <option value="present">On Time</option>
                                                <option value="late">Late</option>
                                                <option value="half-day">Half Day</option>
                                                <option value="absent">Absent</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full gap-2 ">
                                <Button type="button" className="outline-btn">
                                    Back
                                </Button>
                                <Button type="submit" className="outline-btn">
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}