import { useState } from "react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar1Icon } from "lucide-react";
import { Button } from "../../../components/ui/button";

// ⬇️ NEW imports for shadcn Date Picker
import { format, parse } from "date-fns";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";

export type ProjectFormValues = {
  code: string;
  name: string;
  status: "ASDF" | "OPEN" | "DONE" | "";
  startDate: string; // stored as "M/d/yyyy"
  dueDate: string; // stored as "M/d/yyyy"
};

type ProjectFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => void;
  onCancel: () => void;
};

const parseOrUndef = (s?: string) =>
  s ? parse(s, "M/d/yyyy", new Date()) : undefined;

export function ProjectForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>({
    code: initialValues?.code ?? "PJ1234",
    name: initialValues?.name ?? "",
    status: initialValues?.status ?? "",
    startDate: initialValues?.startDate ?? "",
    dueDate: initialValues?.dueDate ?? "",
  });

  const [start, setStart] = useState<Date | undefined>(
    parseOrUndef(initialValues?.startDate)
  );
  const [due, setDue] = useState<Date | undefined>(
    parseOrUndef(initialValues?.dueDate)
  );

  const update = (key: keyof ProjectFormValues, val: string) =>
    setValues((v) => ({ ...v, [key]: val }));

  const submitLabel = mode === "create" ? "Create" : "Update";

  return (
    <form
      className="p-6 w-full flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Project Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Code <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="PJ1234"
            value={values.code}
            onChange={(e) => update("code", e.target.value)}
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            placeholder="Enter Name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={values.status}
            onValueChange={(v) => update("status", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Enter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASDF">ASDF</SelectItem>
              <SelectItem value="OPEN">OPEN</SelectItem>
              <SelectItem value="DONE">DONE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative w-full text-left pl-9 pr-3 py-2 rounded-md border"
              >
                <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                {start ? (
                  format(start, "M/d/yyyy")
                ) : (
                  <span className="text-muted-foreground">
                    Enter Start date
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={start}
                onSelect={(d) => {
                  setStart(d);
                  update("startDate", d ? format(d, "M/d/yyyy") : "");
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Due Date */}
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium">Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative w-full text-left pl-9 pr-3 py-2 rounded-md border"
              >
                <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                {due ? (
                  format(due, "M/d/yyyy")
                ) : (
                  <span className="text-muted-foreground">Enter Due date</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={due}
                onSelect={(d) => {
                  setDue(d);
                  update("dueDate", d ? format(d, "M/d/yyyy") : "");
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 justify-end max-w-4xl">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
