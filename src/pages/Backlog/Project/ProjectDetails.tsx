import { Calendar1Icon } from "lucide-react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { demoProjects } from "./Index";

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = demoProjects.find((p) => String(p.id) === String(id));

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
          <Input value={project.code} readOnly className="bg-muted/30" />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input value={project.name} readOnly className="bg-muted/30" />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select defaultValue={project.status} disabled>
            <SelectTrigger className="bg-muted/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASDF">ASDF</SelectItem>
              <SelectItem value="OPEN">OPEN</SelectItem>
              <SelectItem value="DONE">DONE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date (read-only date picker style) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <div className="relative">
            <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              className="relative w-full text-left pl-9 pr-3 py-2 rounded-md border bg-muted/30 text-foreground cursor-default"
              disabled
            >
              {project.startDate ? (
                project.startDate
              ) : (
                <span className="text-muted-foreground">No date</span>
              )}
            </button>
          </div>
        </div>

        {/* Due Date (read-only date picker style) */}
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium">Due Date</label>
          <div className="relative">
            <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              className="relative w-full text-left pl-9 pr-3 py-2 rounded-md border bg-muted/30 text-foreground cursor-default"
              disabled
            >
              {project.endDate ? (
                project.endDate
              ) : (
                <span className="text-muted-foreground">No date</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-6 justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="px-8 py-2"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
