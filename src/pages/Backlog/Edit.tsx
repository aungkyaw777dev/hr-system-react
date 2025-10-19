import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Calendar1Icon,RefreshCcw, ChevronDown, Check} from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

export default function BacklogEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mockData = [
    {
      id: 1,
      taskCode: "PJ1234",
      taskName: "UI Design",
      taskDescription: "Design user interface mockups",
      assignee: "Chan Lay",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-01-15",
      dueDate: "2024-02-15",
      workingHours: 80,
    },
    {
      id: 2,
      taskCode: "PJ1235",
      taskName: "API Development",
      taskDescription: "Develop REST API endpoints",
      assignee: "Bob Smith",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-01-10",
      dueDate: "2024-02-10",
      workingHours: 120,
    },
    {
      id: 3,
      taskCode: "PJ1236",
      taskName: "Database Migration",
      taskDescription: "Migrate database to new schema",
      assignee: "Charlie Brown",
      projectName: "HR System",
      status: "Pending",
      startDate: "2024-02-01",
      dueDate: "2024-03-01",
      workingHours: 60,
    },
    {
      id: 4,
      taskCode: "PJ1237",
      taskName: "Frontend Implementation",
      taskDescription: "Implement frontend components",
      assignee: "Diana Prince",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-01-20",
      dueDate: "2024-03-20",
      workingHours: 150,
    },
    {
      id: 5,
      taskCode: "PJ1238",
      taskName: "Testing & QA",
      taskDescription: "Quality assurance testing",
      assignee: "Ethan White",
      projectName: "HR System",
      status: "Not Started",
      startDate: "2024-03-01",
      dueDate: "2024-03-31",
      workingHours: 100,
    },
    {
      id: 6,
      taskCode: "PJ1239",
      taskName: "Deployment",
      taskDescription: "Deploy application to production",
      assignee: "Fiona Green",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-02-15",
      dueDate: "2024-03-15",
      workingHours: 40,
    },
    {
      id: 7,
      taskCode: "PJ1240",
      taskName: "User Acceptance Testing",
      taskDescription: "Conduct UAT with stakeholders",
      assignee: "George Miller",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-10",
      dueDate: "2024-04-10",
      workingHours: 90,
    },
    {
      id: 8,
      taskCode: "PJ1241",
      taskName: "Documentation",
      taskDescription: "Create technical documentation",
      assignee: "Hannah Lee",
      projectName: "HR System",
      status: "Not Started",
      startDate: "2024-04-01",
      dueDate: "2024-04-30",
      workingHours: 60,
    },
    {
      id: 9,
      taskCode: "PJ1242",
      taskName: "Bug Fixing",
      taskDescription: "Fix critical production bugs",
      assignee: "Ian Black",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-05",
      dueDate: "2024-03-25",
      workingHours: 70,
    },
    {
      id: 10,
      taskCode: "PJ1243",
      taskName: "Code Review",
      taskDescription: "Review team code submissions",
      assignee: "Jane Doe",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-02-20",
      dueDate: "2024-03-05",
      workingHours: 30,
    },
    {
      id: 11,
      taskCode: "PJ1244",
      taskName: "Performance Testing",
      taskDescription: "Test application performance",
      assignee: "Kevin Hart",
      projectName: "HR System",
      status: "Pending",
      startDate: "2024-04-05",
      dueDate: "2024-04-25",
      workingHours: 80,
    },
    {
      id: 12,
      taskCode: "PJ1245",
      taskName: "UI Testing",
      taskDescription: "Test user interface components",
      assignee: "Laura King",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-15",
      dueDate: "2024-04-05",
      workingHours: 50,
    },
    {
      id: 13,
      taskCode: "PJ1246",
      taskName: "API Testing",
      taskDescription: "Test REST API endpoints",
      assignee: "Michael Scott",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-02-10",
      dueDate: "2024-02-28",
      workingHours: 65,
    },
    {
      id: 14,
      taskCode: "PJ1247",
      taskName: "Database Testing",
      taskDescription: "Test database operations",
      assignee: "Nina Patel",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-01",
      dueDate: "2024-03-20",
      workingHours: 55,
    },
    {
      id: 15,
      taskCode: "PJ1248",
      taskName: "Frontend Testing",
      taskDescription: "Test frontend functionality",
      assignee: "Oscar Wilde",
      projectName: "HR System",
      status: "Pending",
      startDate: "2024-04-10",
      dueDate: "2024-04-30",
      workingHours: 75,
    },
    {
      id: 16,
      taskCode: "PJ1249",
      taskName: "Backend Testing",
      taskDescription: "Test backend services",
      assignee: "Paula Abdul",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-02-05",
      dueDate: "2024-02-25",
      workingHours: 85,
    },
    {
      id: 17,
      taskCode: "PJ1250",
      taskName: "Code Review",
      taskDescription: "Perform code quality review",
      assignee: "Quincy Adams",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-12",
      dueDate: "2024-03-28",
      workingHours: 40,
    },
    {
      id: 18,
      taskCode: "PJ1251",
      taskName: "Internal Testing",
      taskDescription: "Conduct internal QA testing",
      assignee: "Rachel Green",
      projectName: "HR System",
      status: "Not Started",
      startDate: "2024-04-15",
      dueDate: "2024-05-05",
      workingHours: 70,
    },
    {
      id: 19,
      taskCode: "PJ1252",
      taskName: "AI Model Training",
      taskDescription: "Train machine learning models",
      assignee: "Steve Rogers",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-20",
      dueDate: "2024-04-20",
      workingHours: 120,
    },
    {
      id: 20,
      taskCode: "PJ1253",
      taskName: "Feature Development",
      taskDescription: "Develop new features",
      assignee: "Tina Fey",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-01-25",
      dueDate: "2024-02-20",
      workingHours: 95,
    },
    {
      id: 21,
      taskCode: "PJ1254",
      taskName: "Stakeholder Review",
      taskDescription: "Present progress to stakeholders",
      assignee: "Uma Thurman",
      projectName: "HR System",
      status: "Pending",
      startDate: "2024-04-20",
      dueDate: "2024-05-01",
      workingHours: 25,
    },
    {
      id: 22,
      taskCode: "PJ1255",
      taskName: "Testing and QA",
      taskDescription: "Comprehensive testing phase",
      assignee: "Victor Hugo",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-25",
      dueDate: "2024-04-15",
      workingHours: 110,
    },
    {
      id: 23,
      taskCode: "PJ1256",
      taskName: "Documentation",
      taskDescription: "Update system documentation",
      assignee: "Wendy Darling",
      projectName: "HR System",
      status: "Not Started",
      startDate: "2024-05-01",
      dueDate: "2024-05-20",
      workingHours: 45,
    },
    {
      id: 24,
      taskCode: "PJ1257",
      taskName: "Frontend Implementation",
      taskDescription: "Build responsive UI components",
      assignee: "Xander Cage",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-02-01",
      dueDate: "2024-03-01",
      workingHours: 130,
    },
    {
      id: 25,
      taskCode: "PJ1258",
      taskName: "API Development",
      taskDescription: "Create new API endpoints",
      assignee: "Yara Shahidi",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-10",
      dueDate: "2024-04-10",
      workingHours: 100,
    },
    {
      id: 26,
      taskCode: "PJ1259",
      taskName: "Database Migration",
      taskDescription: "Migrate legacy database",
      assignee: "Zachary Levi",
      projectName: "HR System",
      status: "Pending",
      startDate: "2024-04-25",
      dueDate: "2024-05-15",
      workingHours: 80,
    },
    {
      id: 27,
      taskCode: "PJ1260",
      taskName: "Backend Development",
      taskDescription: "Develop backend services",
      assignee: "Aaron Paul",
      projectName: "HR System",
      status: "Completed",
      startDate: "2024-01-20",
      dueDate: "2024-02-18",
      workingHours: 140,
    },
    {
      id: 28,
      taskCode: "PJ1261",
      taskName: "Authorization",
      taskDescription: "Implement auth system",
      assignee: "Betty White",
      projectName: "HR System",
      status: "In Progress",
      startDate: "2024-03-08",
      dueDate: "2024-03-30",
      workingHours: 75,
    },
    {
      id: 29,
      taskCode: "PJ1262",
      taskName: "Bug Fixing",
      taskDescription: "Resolve identified issues",
      assignee: "Carl Jung",
      projectName: "HR System",
      status: "Not Started",
      startDate: "2024-04-18",
      dueDate: "2024-05-08",
      workingHours: 60,
    },
    {
      id: 30,
      taskCode: "PJ1263",
      taskName: "Pilot Testing",
      taskDescription: "Run pilot testing phase",
      assignee: "Daisy Ridley",
      projectName: "HR System",
      status: "Pending",
      startDate: "2024-05-05",
      dueDate: "2024-05-25",
      workingHours: 90,
    },
  ];

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

  const [formData, setFormData] = useState({
    taskCode: "",
    taskName: "",
    taskDescription: "",
    assignee: "",
    projectName: "",
    status: "",
    workingHours: "",
  });

  const [initialFormData, setInitialFormData] = useState({
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
  const [initialStartDate, setInitialStartDate] = useState<Date | undefined>(undefined);
  const [initialDueDate, setInitialDueDate] = useState<Date | undefined>(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  useEffect(() => {
    // Find the task by id
    const task = mockData.find(item => item.id === Number(id));
    
    if (task) {
      const data = {
        taskCode: task.taskCode,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        assignee: task.assignee,
        projectName: task.projectName,
        status: task.status,
        workingHours: String(task.workingHours),
      };
      
      setFormData(data);
      setInitialFormData(data);
      setStartDate(new Date(task.startDate));
      setInitialStartDate(new Date(task.startDate));
      setdueDate(new Date(task.dueDate));
      setInitialDueDate(new Date(task.dueDate));
    }
  }, [id]);

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

  const hasFormChanged = () => {
    const dataChanged = Object.keys(formData).some(
      key => formData[key as keyof typeof formData] !== initialFormData[key as keyof typeof initialFormData]
    );
    
    const startDateChanged = startDate?.getTime() !== initialStartDate?.getTime();
    const dueDateChanged = dueDate?.getTime() !== initialDueDate?.getTime();
    
    return dataChanged || startDateChanged || dueDateChanged;
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


  return (
    <div className="py-6 px-10 w-full flex-1">
      <div className="flex items-center gap-4 mb-6">
        <p className="font-semibold">Backlog Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-50">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3">Task Code</label>
            <input
              type="text"
              disabled
              name="taskCode"
              value={formData.taskCode}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md text-sm bg-natural-500 "
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
              className="w-full p-3 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="w-full p-3 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary text-left flex items-center justify-between"
                >
                  <span className={formData.projectName ? "" : "text-gray-400"}>
                    {formData.projectName || "Select project name"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-primary-500 text-white" align="start">
                <div className="max-h-60 overflow-auto">
                  {mockProjects.map((project) => (
                    <button
                      key={project}
                      onClick={() => handleProjectSelect(project)}
                      className="w-full p-3 text-sm text-left hover:bg-gray-100 hover:text-gray-700 transition-colors"
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
                    "w-full justify-start text-left font-normal p-3 h-auto border-gray-300",
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
                className="w-auto p-0 bg-primary-500 text-white"
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
              className="w-full p-3 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
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
              className="w-full p-3 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter task name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Assignee</label>
            <Popover open={showAssigneeDropdown} onOpenChange={setShowAssigneeDropdown}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full p-3 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary text-left flex items-center justify-between"
                >
                  <span className={formData.assignee ? "" : "text-gray-400"}>
                    {formData.assignee || "Select assignee name"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-primary-500 text-white" align="start">
                <div className="max-h-60 overflow-auto">
                  {mockAssignees.map((assignee) => (
                    <button
                      key={assignee}
                      onClick={() => handleAssigneeSelect(assignee)}
                      className="w-full p-3 text-sm text-left hover:bg-gray-100 hover:text-gray-700 transition-colors"
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
              className="w-full p-3 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
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
                    "w-full justify-start text-left font-normal p-3 h-auto border-gray-300",
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
                className="w-auto p-0 bg-primary-500 text-white"
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
          className="outline-btn"
     
          onClick={() => navigate("/backlog")}
        >
          Cancel
        </Button>
        <Button
          className="outline-btn"
          onClick={handleSubmit}
          disabled={!hasFormChanged()}
        >
          Update
        </Button>
      </div>

      {/* Success Modal */}
   <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
  <AlertDialogContent className="max-w-md bg-primary-50">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-15%] bg-primary-100 rounded-full p-3">
      <div className="w-15 m-auto bg-primary-400 rounded-full text-center">
        <Check className="h-15 w-15 text-white m-auto"/>
      </div>
    </div>
    <AlertDialogDescription className="text-center text-lg font-semibold mt-10 mb-3">
      Updated Successful!
    </AlertDialogDescription>
    <AlertDialogCancel onClick={() => navigate("/backlog")} className="m-auto w-40 bg-primary-400 text-white hover:bg-primary-500 hover:text-white">OK</AlertDialogCancel>
  </AlertDialogContent>
</AlertDialog>
    </div>
  );
}
