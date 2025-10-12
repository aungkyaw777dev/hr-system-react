import { Link } from "react-router-dom";
export default function Sidebar() {
    return (
        <div className="bg-primary text-white text-2xl h-full flex flex-col items-center gap-2 w-full">
            <Link to="/dashboard" className="sidebar-btn">Dashboard</Link>
            <Link to="/role" className="sidebar-btn">Role</Link>
            <Link to="/menu" className="sidebar-btn">Menu</Link>
            <Link to="/role" className="sidebar-btn">Role & Permission</Link>
            <Link to="/employee" className="sidebar-btn">Employee</Link>
            <Link to="/backlog" className="sidebar-btn">Backlog</Link>
            <Link to="/attendance" className="sidebar-btn">Attendance</Link>
            <Link to="/payroll" className="sidebar-btn">Payroll</Link>
            <Link to="/logout" className="sidebar-btn">Logout</Link>
        </div>
    );
}