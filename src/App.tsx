import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Attendance from "./pages/Attendance";
import Role from "./pages/Role";
import CreateRole from "./pages/CreatetRole";
import UpdateRole from "./pages/UpdateRole";
import ViewRole from "./pages/ViewRole";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/role" element={<Role />}></Route>
            <Route path="/role/create" element={<CreateRole />}></Route>
            <Route path="/role/update" element={<UpdateRole/>}></Route>
            <Route path="/role/view" element={<ViewRole/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
