import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Attendance from "./pages/Attendance";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/attendance" element={<Attendance />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
