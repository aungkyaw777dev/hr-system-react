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

  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState(false);
  const toglemenuItem = () => setIsSubMenuItemOpen(!isSubMenuItemOpen);
  const [isBackLogMenuOpen, setIsBackLogMenuOpen] = useState(false);
  const toggleBackLogMenu = () => setIsBackLogMenuOpen(!isBackLogMenuOpen);
  return (
      <div className="flex flex-col items-center">
        <Link to="/dashboard" className="sidebar-btn">
          <LayoutDashboard />Dashboard
        </Link>
        <Link to="/role" className="sidebar-btn">
          <UserRound />Role
        </Link>
        <div
          className="sidebar-btn flex w-full"
          onClick={toglemenuItem}
        >
          <span className="cursor-pointer flex gap-1"><LayoutDashboard />Menu</span>
          <ChevronDown
            className={`mt-2 text-sm transition-transform duration-300 ${
              isSubMenuItemOpen ? "rotate-180" : "rotate-0"
            }`}
            size={14}
          />
        </div>
        {isSubMenuItemOpen && (
          <ul className="w-full">
            <li className="sidebar-btn">
              <Link to="/menuitem">Menu Item</Link>
            </li>
          </ul>
        )}
        <Link to="/role" className="sidebar-btn">
          <UserRound />Role & Permission
        </Link>
        <Link to="/employee" className="sidebar-btn">
          <UsersRound />Employee
        </Link>
        <div
          className="sidebar-btn flex w-full"
          onClick={toggleBackLogMenu}
        >
          <span className="cursor-pointer flex gap-1"><LayoutTemplate />Backlog Module</span>
          <ChevronDown
            className={`mt-2 text-sm transition-transform duration-300 ${
              isBackLogMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            size={14}
          />
        </div>
        {isBackLogMenuOpen && (
          <ul className="w-full">
            <li className="sidebar-btn">
              <Link to="/backlog">Backlog</Link>
            </li>
            <li className="sidebar-btn">
              <Link to="/project">Project</Link>
            </li>
          </ul>
        )}
        <div
          className="sidebar-btn flex w-full" 
          onClick={toggleSubmenu}
        >
          <span className="cursor-pointer flex gap-1"><Clock />Attendance Module</span>
          <ChevronDown
            className={`mt-2 text-sm transition-transform duration-300 ${
              isSubMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            size={14}
          />
        </div>
        {isSubMenuOpen && (
          <ul className="w-full">
            <li className="sidebar-btn">
              <Link to="/location">Location</Link>
            </li>
            <li className="sidebar-btn">
              <Link to="/attendance">Attendance</Link>
            </li>
          </ul>
        )}
        <Link to="/payroll" className="sidebar-btn">
          <DollarSign /> Payroll
        </Link>
        <Link to="/logout" className="sidebar-btn">
          <LogOut /> Logout
        </Link>
      </div>
  );
}
