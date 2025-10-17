import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Calendar1Icon, X ,RefreshCcw, ChevronDown} from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

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
    taskCode: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleProjectSelect = (project: string) => {
    setFormData((prev) => ({
      ...prev,
      projectName: project,
    }));
    setShowProjectDropdown(false);
  };

  const handleAssigneeSelect = (assignee: string) => {
    setFormData((prev) => ({
      ...prev,
      assignee: assignee,
    }));
    setShowAssigneeDropdown(false);
  };


  const isFormValid = () => {
    return (
      formData.taskCode.trim() !== "" &&
      formData.taskName.trim() !== "" &&
      formData.taskDescription.trim() !== "" &&
      formData.assignee.trim() !== "" &&
      formData.projectName.trim() !== "" &&
      formData.status.trim() !== "" &&
      formData.workingHours.trim() !== "" &&
      startDate !== undefined &&
      dueDate !== undefined
    );
  };

  const handleSubmit = () => {
    // Add your API call here
    console.log({
      ...formData,
      startDate,
      dueDate,
    });

    // Show success modal
    setShowSuccessModal(true);

    // After successful API call, uncomment below:
    // await createTaskAPI(formData)
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/backlog");
  };

  return (
    <div className="py-6 px-10 w-full flex-1">
      <div className="flex items-center gap-4 mb-6">
        <p className="font-semibold">Backlog Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-100">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3">Task Code</label>
            <input
              type="text"
              name="taskCode"
              value={formData.taskCode}
              onChange={handleInputChange}
              className="w-full px-4 pr-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter task code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Task Description
            </label>
            <input
              type="text"
              name="taskDescription"
              value={formData.taskDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Project Name
            </label>
            <Popover open={showProjectDropdown} onOpenChange={setShowProjectDropdown}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full px-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary text-left flex items-center justify-between"
                >
                  <span className={formData.projectName ? "" : "text-gray-400"}>
                    {formData.projectName || "Select project name"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-primary text-white" align="start">
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal px-4 py-4 h-auto",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <Calendar1Icon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "LLL dd, y")
                  ) : (
                    <span>Enter start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-primary text-white"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter working hours"
            />
          </div>
        </div>

        <div className="space-y-8 pr-5">
          <div>
            <label className="block text-sm font-medium mb-3">Task Name</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter task name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Assignee</label>
            <Popover open={showAssigneeDropdown} onOpenChange={setShowAssigneeDropdown}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full px-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary text-left flex items-center justify-between"
                >
                  <span className={formData.assignee ? "" : "text-gray-400"}>
                    {formData.assignee || "Select assignee name"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-primary text-white" align="start">
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
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter task status"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal px-4 py-4 h-auto",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <Calendar1Icon className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, "LLL dd, y")
                  ) : (
                    <span>Enter due date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-primary text-white"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setdueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="mt-4 mr-5 flex justify-end gap-3">
        <Button
          className="py-3 px-8 bg-gray-200"
          variant={"default"}
          onClick={() => navigate("/backlog")}
        >
          Cancel
        </Button>
        <Button
          className="py-3 px-8 bg-[#CED7D3]"
          variant={"default"}
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Create
        </Button>
      </div>

      {/* Success Modal */}
      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="max-w-md">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-7 w-7" />
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center pt-2"><RefreshCcw className="h-20 w-20 text-gray-500 m-auto"/></AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg mt-4 mb-6">
              Added successfully!
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
