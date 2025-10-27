import { BrowserRouter, Route, Routes } from "react-router-dom";

import Role from "./pages/Role/Role";
import CreateRole from "./pages/Role/CreatetRole";
import UpdateRole from "./pages/Role/UpdateRole";
import ViewRole from "./pages/Role/ViewRole";
import { BacklogCreate } from "./pages/Backlog/Create";
import { BacklogDetail } from "./pages/Backlog/Detail";
import Backlog from "./pages/Backlog/Index";
import { BacklogEdit } from "./pages/Backlog/Edit";
import MainLayout from "./layouts/MainLayout";
import LocationCreate from "./pages/Attendance/Location/LocationCreate";
import LocationEdit from "./pages/Attendance/Location/LocationEdit";
import LocationDetail from "./pages/Attendance/Location/LocationDetail";
import { AttendanceList } from "./pages/Attendance/Index";
import { CreateAttendance } from "./pages/Attendance/Create";
import { UpdateAttendance } from "./pages/Attendance/[id]";
import Payroll from "./pages/Payroll/Payroll";
import PayrollCreate from "./pages/Payroll/PayrollCreate";
import PayrollEdit from "./pages/Payroll/PayrollEdit";
import PayrollDetail from "./pages/Payroll/PayrollDetail";
import AdminDashboard from "./pages/Dashboard/Admin";
import LoginPage from "./pages/Login";
import MenuItem from "./pages/Menu/MenuItem";
import MenuItemCreate from "./pages/Menu/MenuItemCreate";
import MenuItemEdit from "./pages/Menu/MenuItemEdit";
import ProjectList from "./pages/Backlog/Project/Index";
import { ProjectDetails } from "./pages/Backlog/Project/ProjectDetails";
import { ProjectCreate } from "./pages/Backlog/Project/ProjectCreate";
import { ProjectEdit } from "./pages/Backlog/Project/ProjectEdit";
import Employee from "./pages/Employee/Index";
import EmployeeForm from "./components/employee/EmployeeForm";
import EmployeeView from "./pages/Employee/View";
import Location from "./pages/Attendance/Location/Index";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AuthLayout from "./layouts/AuthLayout";
import OtpVerification from "./pages/Auth/OtpVerification";
import ResetPassword from "./pages/Auth/ResetPassword";
import PasswordChanged from "./pages/Auth/PasswordChanged";
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
          <Route element={<MainLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
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
            <Route path="/location" element={<Location />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/employee/new" element={<EmployeeForm />}></Route>
            <Route path="/employee/edit/:code" element={<EmployeeForm />} />
            <Route path="/employee/view/:code" element={<EmployeeView />} />
            <Route path="/payroll" element={<Payroll />}></Route>
            <Route path="/payroll/create" element={<PayrollCreate />}></Route>
            <Route path="/payroll/:id/edit" element={<PayrollEdit />}></Route>
            <Route path="/payroll/:id" element={<PayrollDetail />}></Route>
            <Route path="/menuitem" element={<MenuItem />}></Route>
            <Route path="/menuitem/create" element={<MenuItemCreate />} />
            <Route path="/menuitem/edit" element={<MenuItemEdit />} />
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/employee/new" element={<EmployeeForm />}></Route>
            <Route path="/employee/edit/:code" element={<EmployeeForm />} />
            <Route path="/employee/view/:code" element={<EmployeeView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
