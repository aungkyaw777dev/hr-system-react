import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ThumbsUp, ChevronDown } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const mockProjects = [
  "HR System",
  "Employee Management",
  "POS System",
  "Online Booking System",
  "E-Commerce Platform",
];

const mockAssignees = [
  "Chan Lay",
  "Jane Smith",
  "Mike Johnson",
  "Sarah Williams",
  "David Brown",
];

export default function BacklogCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    assignee: "",
    projectName: "",
    status: "",
    workingHours: "",
  });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [dueDate, setdueDate] = useState<Date | undefined>(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleProjectSelect = (project: string) => {
    setFormData((prev) => ({
      ...prev,
      projectName: project,
    }));
    setShowProjectDropdown(false);
    // Clear error when user selects
    if (errors.projectName) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.projectName;
        return newErrors;
      });
    }
  };

  const handleAssigneeSelect = (assignee: string) => {
    setFormData((prev) => ({
      ...prev,
      assignee: assignee,
    }));
    setShowAssigneeDropdown(false);
    // Clear error when user selects
    if (errors.assignee) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.assignee;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.taskName.trim() === "") {
      newErrors.taskName = "Task Name cannot be empty!";
    }
    if (formData.taskDescription.trim() === "") {
      newErrors.taskDescription = "Task Description cannot be empty!";
    }
    if (formData.assignee.trim() === "") {
      newErrors.assignee = "Assignee cannot be empty!";
    }
    if (formData.projectName.trim() === "") {
      newErrors.projectName = "Project Name cannot be empty!";
    }
    if (formData.status.trim() === "") {
      newErrors.status = "Task Status cannot be empty!";
    }
    if (formData.workingHours.trim() === "") {
      newErrors.workingHours = "Working Hours cannot be empty!";
    }
    if (!startDate) {
      newErrors.startDate = "Start Date cannot be empty!";
    }
    if (!dueDate) {
      newErrors.dueDate = "Due Date cannot be empty!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    console.log({
      ...formData,
      startDate,
      dueDate,
    });

    setShowSuccessModal(true);
  };

  return (
    <div className="py-6 px-10 w-full flex-1">
      <div className="flex items-center gap-4 mb-6">
        <p className="font-semibold">Backlog Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-50">
        <div className="space-y-10">
          <div>
            <label className="block text-sm font-medium mb-3">Task Name</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              className={`w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.taskName ? "border-2 border-red-500" : ""
              }`}
              placeholder="Enter task name"
            />
            {errors.taskName && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.taskName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Assignee</label>
            <Popover
              open={showAssigneeDropdown}
              onOpenChange={setShowAssigneeDropdown}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary text-left flex items-center justify-between"
                >
                  <span className={formData.assignee ? "" : "text-gray-400"}>
                    {formData.assignee || "Select assignee name"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0 bg-primary-500 text-white"
                align="start"
              >
                <div className="max-h-60 overflow-auto">
                  {mockAssignees.map((assignee) => (
                    <button
                      key={assignee}
                      onClick={() => handleAssigneeSelect(assignee)}
                      className="w-full px-4 py-3 text-sm text-left hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                      {assignee}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {errors.assignee && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.assignee}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Task Status
            </label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.status ? "border-2 border-red-500" : ""
              }`}
              placeholder="Enter task status"
            />
            {errors.status && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.status}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal p-3 h-auto border-gray-300",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, "LLL dd, y")
                  ) : (
                    <span>Enter due date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-primary-500 text-white"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setdueDate(date);
                    if (errors.dueDate) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.dueDate;
                        return newErrors;
                      });
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-10 pr-5">
          <div>
            <label className="block text-sm font-medium mb-3">
              Task Description
            </label>
            <input
              type="text"
              name="taskDescription"
              value={formData.taskDescription}
              onChange={handleInputChange}
              className={`w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.taskDescription ? "border-2 border-red-500" : ""
              }`}
              placeholder="Enter task description"
            />
            {errors.taskDescription && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.taskDescription}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Project Name
            </label>
            <Popover
              open={showProjectDropdown}
              onOpenChange={setShowProjectDropdown}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary text-left flex items-center justify-between"
                >
                  <span className={formData.projectName ? "" : "text-gray-400"}>
                    {formData.projectName || "Select project name"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0 bg-primary-500 text-white"
                align="start"
              >
                <div className="max-h-60 overflow-auto">
                  {mockProjects.map((project) => (
                    <button
                      key={project}
                      onClick={() => handleProjectSelect(project)}
                      className="w-full px-4 py-3 text-sm text-left hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                      {project}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {errors.projectName && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.projectName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal p-3 h-auto border-gray-300",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "LLL dd, y")
                  ) : (
                    <span>Enter start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-primary-500 text-white"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    if (errors.startDate) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.startDate;
                        return newErrors;
                      });
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Working Hours
            </label>
            <input
              type="number"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleInputChange}
              className={`w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.workingHours ? "border-2 border-red-500" : ""
              }`}
              placeholder="Enter working hours"
            />
            {errors.workingHours && (
              <p className="text-sm font-medium text-red-500 mt-2">
                {errors.workingHours}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 mr-5 flex justify-end gap-3">
        <Button className="outline-btn" onClick={() => navigate("/backlog")}>
          {" "}
          Cancel
        </Button>
        <Button className="outline-btn" onClick={handleSubmit}>
          Create
        </Button>
      </div>

      {/* Success Modal */}

      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="max-w-md bg-primary-50">
          <div className="absolute left-1/2 -translate-x-1/2 top-[-15%] bg-primary-100 rounded-full p-3">
            <ThumbsUp className="h-15 w-15 text-primary-400 m-auto" />
          </div>
          <AlertDialogDescription className="text-center text-lg font-semibold mt-10 mb-3">
            Create Successful!
          </AlertDialogDescription>
          <AlertDialogCancel
            onClick={() => navigate("/backlog")}
            className="m-auto w-40 bg-primary-400 text-white hover:bg-primary-500 hover:text-white"
          >
            OK
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
