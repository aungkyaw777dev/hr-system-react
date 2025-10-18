import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/location" element={<Location />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/employee/new" element={<EmployeeForm />}></Route>
            <Route path="/employee/edit/:code" element={<EmployeeForm />} />
            <Route path="/employee/view/:code" element={<EmployeeView />} />
            <Route path="/payroll" element={<Payroll />}></Route>
            <Route path="/payroll/create" element={<PayrollCreate />}></Route>
            <Route path="/payroll/:id/edit" element={<PayrollEdit />}></Route>
            <Route path="/payroll/:id/detail" element={<PayrollDetail />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
