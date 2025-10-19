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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "./calendar";
import { ChevronDownIcon, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const formSchema = z.object({
  employeeCode: z.string().nonempty("Employee Code cannot be empty!"),
  employeeName: z.string().nonempty("Employee Name cannot be empty"),
  checkinLocation: z.string().nonempty("Check In location cannot be empty!"),
  checkoutLocation: z.string().nonempty("Check out location cannot be empty!"),
  checkinTime: z.string().nonempty("Checkin Time cannot be empty!"),
  checkoutTime: z.string().nonempty("Checkout Time cannot be empty!"),
  workingHour: z
    .float32()
    .min(0, "Working hour cannot be negative")
    .max(24, "Too many hours"),
  status: z.string().nonempty("checkin and checkout time incorrect"),
  date: z.date(),
  remark: z.string(),
});
export default function AttendanceForm() {
  const { code } = useParams();
  console.log(code);
  const [open, setOpen] = useState(false);
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
      remark: "",
    },
  });
  const { setValue } = form;

  const checkinTime = form.watch("checkinTime");
  const checkoutTime = form.watch("checkoutTime");

  useEffect(() => {
    if (!checkinTime || !checkoutTime) return;
    const status = calculateAttendanceStatus(checkinTime, checkoutTime);
    setValue("status", status);
    console.log(form.getValues("status"));
  }, [checkinTime, checkoutTime]);

  const calculateAttendanceStatus = (checkIn: string, checkOut: string) => {
    const toMinutes = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    // Reference points
    const START_TIME = toMinutes("09:00");
    const LATE_THRESHOLD = toMinutes("10:00");
    const LATE_THRESHOLD_EVENING = toMinutes("14:00");
    const EARLY_DEPARTURE_THRESHOLD = toMinutes("16:30");
    const END_TIME = toMinutes("17:00");
    const HALF_MORNING_END_TIME = toMinutes("12:00");
    const HALF_EVENING_START_TIME = toMinutes("13:00");

    // Validate inputs
    if (!checkIn || !checkOut) return "absent";

    const checkInMinutes = toMinutes(checkIn);
    const checkOutMinutes = toMinutes(checkOut);
    const hours = (checkOutMinutes - checkInMinutes) / 60;
    form.setValue("workingHour", parseFloat(hours.toFixed(2)));

    // Validation: Check-out must be after check-in
    if (checkOutMinutes <= checkInMinutes) {
      form?.setError?.("checkinTime", {
        message: "Checkout time must be later than checkin time",
      });
      return "";
    }

    // --- Determine status ---
    let status = "absent";

    // Check-in based logic
    if (checkInMinutes < START_TIME && checkOutMinutes > END_TIME) {
      status = "present";
    } else if (checkInMinutes <= LATE_THRESHOLD) {
      status = "late";
    } else if (checkInMinutes > LATE_THRESHOLD) {
      status = "half-day";
    }

    // //half-day MORNING working logic
    // if (
    //   checkInMinutes < LATE_THRESHOLD &&
    //   checkOutMinutes >= HALF_MORNING_END_TIME &&
    //   checkOutMinutes < EARLY_DEPARTURE_THRESHOLD
    // ) {
    //   status = "half-day";
    // }

    // //half-day evening working logic
    // if (
    //   checkInMinutes < HALF_EVENING_START_TIME &&
    //   checkInMinutes <= LATE_THRESHOLD_EVENING &&
    //   checkOutMinutes >= END_TIME
    // ) {
    //   status = "half-day";
    // }
    if (
      checkOutMinutes >= EARLY_DEPARTURE_THRESHOLD &&
      checkOutMinutes < END_TIME &&
      (status === "present" || status === "late")
    ) {
      status = "early-departure";
    } else if (checkOutMinutes >= END_TIME && status === "present") {
      status = "present";
    } else if (checkOutMinutes >= END_TIME && status === "late") {
      status = "late";
    } else if (checkOutMinutes < EARLY_DEPARTURE_THRESHOLD) {
      status = "absent";
    }
    form.setValue("status", status);
    return status;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row w-full p-2 mt-4"
        >
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
              />
              <FormField
                control={form.control}
                name="workingHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Working Hour</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
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
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
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
                          <Button
                            variant="outline"
                            className="w-full justify-start font-normal"
                          >
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
                        <Button
                          variant="outline"
                          className="w-full justify-start font-normal"
                        >
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
                      <Input {...field} readOnly />
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
                  {code ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
