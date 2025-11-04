import { BrowserRouter, Route, Routes } from "react-router-dom";

// Role
import Role from "./pages/Management/Admin/Role/Role";
import CreateRole from "./pages/Management/Admin/Role/CreatetRole";
import UpdateRole from "./pages/Management/Admin/Role/UpdateRole"
import ViewRole from "./pages/Management/Admin/Role/ViewRole"

// Backlog
import { BacklogCreate } from "./pages/Management/Backlog/Create";
import { BacklogDetail } from "./pages/Management/Backlog/Detail";
import Backlog from "./pages/Management/Backlog/Index";
import { BacklogEdit } from "./pages/Management/Backlog/Edit";

// layout and dashboard
import MainLayout from "./layouts/MainLayout";
import ManagementDashboard from "./pages/Management/Dashboard/Index";


// location
import Location from "./pages/Management/Attendance/Location/Index";
import LocationCreate from "./pages/Management/Attendance/Location/LocationCreate";
import LocationEdit from "./pages/Management/Attendance/Location/LocationEdit";
import LocationDetail from "./pages/Management/Attendance/Location/LocationDetail";

// attendance
import { AttendanceList } from "./pages/Management/Attendance/Index";
import { CreateAttendance } from "./pages/Management/Attendance/Create";
import { UpdateAttendance } from "./pages/Management/Attendance/[id]";

// Payroll
import Payroll from "./pages/Management/Payroll/Payroll"
import PayrollCreate from "./pages/Management/Payroll/PayrollCreate";
import PayrollEdit from "./pages/Management/Payroll/PayrollEdit";
import PayrollDetail from "./pages/Management/Payroll/PayrollDetail";

// menu item
import MenuItem from "./pages/Management/Admin/Menu/MenuItem"
import MenuItemCreate from "./pages/Management/Admin/Menu/MenuItemCreate";
import MenuItemEdit from "./pages/Management/Admin/Menu/MenuItemEdit";

// project
import ProjectList from "./pages/Management/Backlog/Project/Index";
import { ProjectDetails } from "./pages/Management/Backlog/Project/ProjectDetails";
import { ProjectCreate } from "./pages/Management/Backlog/Project/ProjectCreate";
import { ProjectEdit } from "./pages/Management/Backlog/Project/ProjectEdit"

// employee
import EmployeeList from "./pages/Management/Employee/Index";
import EmployeeCreate from "./pages/Management/Employee/EmployeeCreate";
import EmployeeEdit from "./pages/Management/Employee/EmployeeEdit";
import EmployeeDetail from "./pages/Management/Employee/EmployeeDetail";

//auth
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AuthLayout from "./layouts/AuthLayout";
import OtpVerification from "./pages/Auth/OtpVerification";
import ResetPassword from "./pages/Auth/ResetPassword";
import PasswordChanged from "./pages/Auth/PasswordChanged";
import LoginPage from "./pages/Login";

import Profile from "./pages/Profile/Profile";
import { RoleGuard } from "./components/RoleGuard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-changed" element={<PasswordChanged />} />
          </Route>

          {/* admin */}
          <Route element={<MainLayout />}>
            <Route path="/management/dashboard"
              element={
                <RoleGuard allowedRoles={["admin", "hr"]}>
                  <ManagementDashboard />
                </RoleGuard>
              }>
            </Route>
            <Route path="/backlog" element={<Backlog />}></Route>
            <Route path="/backlog/:id" element={<BacklogDetail />} />
            <Route path="/backlog/create" element={<BacklogCreate />}></Route>
            <Route path="/backlog/edit/:id" element={<BacklogEdit />}></Route>
            <Route path="/project" element={<ProjectList />}></Route>
            <Route path="/projects/new" element={<ProjectCreate />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/:id/edit" element={<ProjectEdit />} />
            <Route path="/role" element={<Role />}></Route>
            <Route path="/role/create" element={<CreateRole />}></Route>
            <Route path="/role/update" element={<UpdateRole />}></Route>
            <Route path="/role/view" element={<ViewRole />}></Route>
            <Route path="/location" element={<Location />}></Route>
            <Route path="/location/create" element={<LocationCreate />}></Route>
            <Route path="/location/edit/:id" element={<LocationEdit />} />
            <Route path="/location/detail/:id" element={<LocationDetail />} />
            <Route path="/attendance" element={<AttendanceList />}></Route>

            <Route
              path="/attendance/create"
              element={<CreateAttendance />}
            ></Route>
            <Route
              path="/attendance/:code/update"
              element={<UpdateAttendance />}
            ></Route>
            <Route path="/payroll" element={<Payroll />}></Route>
            <Route path="/payroll/create" element={<PayrollCreate />}></Route>
            <Route path="/payroll/:id/edit" element={<PayrollEdit />}></Route>
            <Route path="/payroll/:id" element={<PayrollDetail />}></Route>
            <Route path="/menuitem" element={<MenuItem />}></Route>
            <Route path="/menuitem/create" element={<MenuItemCreate />} />
            <Route path="/menuitem/edit" element={<MenuItemEdit />} />
            <Route path="/employee" element={<EmployeeList onSort={undefined} sortConfig={undefined} />}></Route>
            <Route path="/employee/new" element={<EmployeeCreate />}></Route>
            <Route path="/employee/edit/:code" element={<EmployeeEdit />} />
            <Route path="/employee/detail/:code" element={<EmployeeDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/notFound" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
