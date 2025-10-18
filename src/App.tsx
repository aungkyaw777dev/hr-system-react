import { BrowserRouter, Route, Routes } from "react-router-dom";
import BacklogCreate from "./pages/BackLog/Create";
import BacklogDetail from "./pages/BackLog/Detail";
import Backlog from "./pages/BackLog/Index";
import BacklogEdit from "./pages/BackLog/Edit";
import MainLayout from "./layouts/MainLayout";
import Attendance from "./pages/Attendance/Index";
import Location from "./pages/Attendance/Location/Index";
import Employee from "./pages/Employee/Index";
import EmployeeForm from "./components/employee/EmployeeForm";
import EmployeeView from "./pages/Employee/View";
import Payroll from "./pages/Payroll/Payroll";
import PayrollCreate from "./pages/Payroll/PayrollCreate";
import PayrollEdit from "./pages/Payroll/PayrollEdit";
import PayrollDetail from "./pages/Payroll/PayrollDetail";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import MenuItem from "./pages/Menu/MenuItem";
import MenuItemCreate from "./pages/Menu/MenuItemCreate";
import MenuItemEdit from "./pages/Menu/MenuItemEdit";
import ProjectList from "./pages/BackLog/Project/Index";
import { ProjectDetails } from "./pages/BackLog/Project/ProjectDetails";
import { ProjectCreate } from "./pages/BackLog/Project/ProjectCreate";
import { ProjectEdit } from "./pages/BackLog/Project/ProjectEdit";
import AttendanceCreate from "./pages/Attendance/Create"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/backlog" element={<Backlog />}></Route>
            <Route path="/backlog/:id" element={<BacklogDetail />} />
            <Route path="/backlog/create" element={<BacklogCreate/>}></Route>
            <Route path="/backlog/edit/:id" element={<BacklogEdit/>}></Route>
            <Route path="/project" element={<ProjectList />}></Route>
            <Route path="/projects/new" element={<ProjectCreate />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/:id/edit" element={<ProjectEdit />} />
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/attendance/create" element={<AttendanceCreate />}></Route>
            <Route path="/location" element={<Location />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/employee/new" element={<EmployeeForm />}></Route>
            <Route path="/employee/edit/:code" element={<EmployeeForm />} />
            <Route path="/employee/view/:code" element={<EmployeeView />} />
            <Route path="/payroll" element={<Payroll />}></Route>
            <Route path="/payroll/create" element={<PayrollCreate />}></Route>
            <Route path="/payroll/:id/edit" element={<PayrollEdit />}></Route>
            <Route path="/payroll/:id/detail" element={<PayrollDetail />}></Route>
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
