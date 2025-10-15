import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Attendance from "./pages/Attendance/Index";
import Location from "./pages/Attendance/Location";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import MenuItem from "./pages/Menu/MenuItem";
import MenuItemCreate from "./pages/Menu/MenuItemCreate";
import MenuItemEdit from "./pages/Menu/MenuItemEdit";
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

            <Route path="/menuitem" element={<MenuItem />}></Route>
            <Route path="/menuitem/create" element={<MenuItemCreate />} />
            <Route path="/menuitem/edit" element={<MenuItemEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
