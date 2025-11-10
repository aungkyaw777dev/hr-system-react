import { useEffect, useMemo } from "react";
import { Calendar1Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDataStore } from "@/stores/useDataStore";
import { format } from "date-fns";

type Project = {
  projectCode: string;
  projectName: string;
  projectStatus: "Planned" | "InProgress" | "DONE";
  startDate?: string | null;
  endDate?: string | null;
};

const toDMY = (s?: string | null) => {
  if (!s) return null;
  const d = new Date(s);
  if (isNaN(d.getTime())) return null;
  return format(d, "d/M/yyyy");
};

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, fetchData } = useDataStore();

  const url = useMemo(
    () => `http://localhost:5067/api/Project/edit/${id}`,
    [id]
  );

  useEffect(() => {
    if (!id) return;
    fetchData({ url });
  }, [id, url, fetchData]);

  const project = (data.data ?? null) as Project | null;

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Project Information</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Project Information</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Project Information</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const startDMY = toDMY(project.startDate);
  const endDMY = toDMY(project.endDate);

  return (
    <div className="p-6 w-full flex-1">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Project Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Code <span className="text-red-500">*</span>
          </label>
          <Input value={project.projectCode} readOnly className="bg-muted/30" />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input value={project.projectName} readOnly className="bg-muted/30" />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          {/* Keep Select (read-only) but make sure values match your data */}
          <Select value={project.projectStatus} disabled>
            <SelectTrigger className="bg-muted/30">
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Planned">Planned</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
          {/* If you prefer a simpler read-only field, swap the Select above with: */}
          {/* <Input value={project.projectStatus} readOnly className="bg-muted/30" /> */}
        </div>

        {/* Start Date (read-only style) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <div className="relative">
            <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              className="relative w-full text-left pl-9 pr-3 py-2 rounded-md border bg-muted/30 text-foreground cursor-default"
              disabled
            >
              {startDMY ?? (
                <span className="text-muted-foreground">No date</span>
              )}
            </button>
          </div>
        </div>

        {/* Due Date (read-only style) */}
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium">Due Date</label>
          <div className="relative">
            <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              className="relative w-full text-left pl-9 pr-3 py-2 rounded-md border bg-muted/30 text-foreground cursor-default"
              disabled
            >
              {endDMY ?? <span className="text-muted-foreground">No date</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-6 justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="px-8 py-2 outline-btn cursor-pointer"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
