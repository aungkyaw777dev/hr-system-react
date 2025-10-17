import { Link } from "react-router-dom";
import {
    ChevronDown,
    LayoutDashboard,
    UsersRound,
    UserRound,
    LogOut,
    DollarSign,
    ListChecks,
    LayoutTemplate,
    Clock
} from 'lucide-react';
import { useState } from "react";

export default function Sidebar() {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const toggleSubmenu = () => setIsSubMenuOpen(!isSubMenuOpen);
    return (
        <div>
            <div className="flex flex-col items-start justify-start">
                <Link to="/dashboard" className="sidebar-btn"><LayoutDashboard />Dashboard</Link>
                <Link to="/role" className="sidebar-btn"><UserRound />Role</Link>
                <Link to="/employee" className="sidebar-btn"><UsersRound />Employee</Link>
                <Link to="/menu" className="sidebar-btn"><LayoutDashboard /> Menu</Link>
                <Link to="/role" className="sidebar-btn"><UserRound />Role & Menu Permission</Link>
                <Link to="/companyrule" className="sidebar-btn"><ListChecks />Company Rule</Link>
                <Link to="/backlog" className="sidebar-btn"><LayoutTemplate />Backlog Management</Link>
                <div className="sidebar-btn flex w-full " onClick={toggleSubmenu}>
                    <span className="cursor-pointer flex gap-1"> <Clock />Attendance Module</span>
                    <ChevronDown className={`mt-2 text-sm transition-transform duration-300 ${isSubMenuOpen ? "rotate-180" : "rotate-0"}`} size={14} />
                </div>
                {isSubMenuOpen &&
                    <ul className="w-full ms-4">
                        <li className="sidebar-btn">
                            <Link to="/location" >Location</Link>
                        </li>
                        <li className="sidebar-btn">
                            <Link to="/attendance" >Attendance</Link>
                        </li>
                    </ul>
                }
                <Link to="/payroll" className="sidebar-btn"><DollarSign /> Payroll Management</Link>
                <Link to="/logout" className="sidebar-btn"><LogOut /> Logout</Link>
            </div>
        </div>
    );
}