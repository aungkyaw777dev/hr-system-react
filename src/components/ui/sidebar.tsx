import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";

interface SidebarProps {
    isOpen: boolean,
}
export default function Sidebar({ isOpen }: SidebarProps) {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const toggleSubmenu = () => setIsSubMenuOpen(!isSubMenuOpen);
    return (
        <div className={`bg-primary text-white text-xl h-full gap-2 w-full transform transition-transform duration-300 ease-in-out
            lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} >
            <div className="flex flex-col items-center">
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
                {isSubMenuOpen &&
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
        </div>
    );
}