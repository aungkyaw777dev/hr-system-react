import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Calendar1Icon } from "lucide-react";

export default function BacklogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allData = [
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

  const task = allData.find((t) => t.id === parseInt(id));

  if (!task) {
    return (
      <div className="p-10 w-full flex-1">
        <p className="text-red-500">Task not found</p>
        <Button onClick={() => navigate("/backlog")} className="mt-4">
          <ArrowLeft className="mr-2" /> Back to List
        </Button>
      </div>
    );
  }

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
              value={task.taskCode}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Task Description
            </label>
            <input
              type="text"
              value={task.taskDescription}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Project Name
            </label>
            <input
              type="text"
              value={task.projectName}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Start Date</label>
            <div className="relative">
              <input
                type="text"
                value={task.startDate}
                disabled
                className="w-full pl-10 pr-4 py-4 rounded-md text-sm bg-gray-100"
              />
              <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">
              Working Hours
            </label>
            <input
              type="text"
              value={`${task.workingHours} hours`}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>
        </div>

        <div className="space-y-8 pr-5">
          <div>
            <label className="block text-sm font-medium mb-3">Task Name</label>
            <input
              type="text"
              value={task.taskName}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Assignee</label>
            <input
              type="text"
              value={task.assignee}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Task Status
            </label>
            <input
              type="text"
              value={task.status}
              disabled
              className="w-full px-4 py-4 rounded-md text-sm bg-gray-100"
            />
          </div>

           <div>
            <label className="block text-sm font-medium mb-3">Due Date</label>
            <div className="relative">
              <input
                type="text"
                value={task.dueDate}
                disabled
                className="w-full pl-10 pr-4 py-4 rounded-md text-sm bg-gray-100"
              />
              <Calendar1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      {/* back button */}
      <div className="mt-4 mr-5 flex justify-end">
        <Button
          className="py-3 px-8 bg-gray-200" variant={"default"}
          onClick={() => navigate("/backlog")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
