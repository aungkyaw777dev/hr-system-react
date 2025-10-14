import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSubmenu = () => setIsOpen(!isOpen);

    return (
        <div className="bg-primary text-white text-2xl h-full flex flex-col items-center gap-2 w-full">
            <Link to="/dashboard" className="sidebar-btn">Dashboard</Link>
            <Link to="/role" className="sidebar-btn">Role</Link>
            <Link to="/menu" className="sidebar-btn"> Menu</Link>
            <Link to="/role" className="sidebar-btn">Role & Permission</Link>
            <Link to="/employee" className="sidebar-btn">Employee</Link>
            <Link to="/backlog" className="sidebar-btn">Backlog Module</Link>
            <div className="sidebar-btn flex w-full justify-center items-center" onClick={toggleSubmenu}>
                <span className="me-2 cursor-pointer">Attendance Module</span>
                <ChevronDown className={`mt-2 text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} size={14} />

            </div>
            {isOpen &&
                <ul className="w-full">
                    <li className="sidebar-btn">
                        <Link to="/location" >Location</Link>
                    </li>
                    <li className="sidebar-btn">
                        <Link to="/attendance" >Attendance</Link>
                    </li>
                </ul>
            }
            <Link to="/payroll" className="sidebar-btn">Payroll</Link>
            <Link to="/logout" className="sidebar-btn">Logout</Link>
        </div>
    );
}