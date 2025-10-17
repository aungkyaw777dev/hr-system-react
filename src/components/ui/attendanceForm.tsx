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
} from "../../components/ui/form";

import { parseDate } from "chrono-node"

import { Input } from "../../components/ui/input";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { dateFormatter, formatDate } from "../../lib/utils";

const formSchema = z.object({
    employeeCode: z.string().nonempty("Employee Code cannot be empty!"),
    employeeName: z.string().nonempty("Employee Name cannot be empty"),
    checkinLocation: z.string().nonempty("Check In location cannot be empty!"),
    checkoutLocation: z.string().nonempty("Check out location cannot be empty!"),
    checkinTime: z.string().nonempty("Checkin Time cannot be empty!"),
    checkoutTime: z.string().nonempty("Checkout Time cannot be empty!"),
    workingHour: z.number().min(0, "Working hour cannot be negative").max(24, "Too many hours"),
    status: z.string().nonempty("Status cannot be empty"),
});
export default function AttendanceForm() {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("In 2 days")
    const [date, setDate] = useState<Date | undefined>()
    const [month, setMonth] = useState<Date | undefined>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeCode: "",
            employeeName: "",
            checkinLocation: "",
            checkoutLocation: "",
            checkinTime: "",
            checkoutTime: "",
            workingHour: 0,
            status: ""
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };
    return (
        <div className="w-full">
            <Form {...form} >
                <p className="ms-8">Add New Attendance</p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full justify-around p-2">
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
                                    <FormLabel>Checkout Location</FormLabel>
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
                                    <FormLabel>Checkout Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-3">
                            <div className="relative flex gap-2">
                                <Input
                                    id="date"
                                    value={value}
                                    placeholder="Tomorrow or next week"
                                    className="bg-background pr-10"
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        const date = parseDate(e.target.value)
                                        if (date) {
                                            setDate(date)
                                            setMonth(date)
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "ArrowDown") {
                                            e.preventDefault()
                                            setOpen(true)
                                        }
                                    }}
                                />
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-picker"
                                            variant="ghost"
                                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                        >
                                            <CalendarIcon className="size-3.5" />
                                            <span className="sr-only">Select date</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            month={month}
                                            onMonthChange={setMonth}
                                            onSelect={(date) => {
                                                setDate(date)
                                                setValue(dateFormatter(date))
                                                setOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="text-muted-foreground px-1 text-sm">
                                Your post will be published on{" "}
                                <span className="font-medium">{formatDate(date)}</span>.
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="checkoutTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Checkout Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Checkout Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full gap-2 justify-end">
                            <Button type="submit" className="bg-primary text-white">
                                Back
                            </Button>
                            <Button type="submit" className="bg-primary text-white">
                                Create
                            </Button>
                        </div>
                    </div>

                </form>
            </Form>
        </div>
    )
}