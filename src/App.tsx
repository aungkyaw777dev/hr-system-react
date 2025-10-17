import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Attendance from "./pages/Attendance/Index";
import Location from "./pages/Attendance/Location/Index";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/location" element={<Location />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
