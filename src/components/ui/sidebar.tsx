import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubmenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState(false);
  const toglemenuItem = () => setIsSubMenuItemOpen(!isSubMenuItemOpen);
  return (
    <div>
      <div className="flex flex-col items-center">
        <Link to="/dashboard" className="sidebar-btn">
          Dashboard
        </Link>
        <Link to="/role" className="sidebar-btn">
          Role
        </Link>
        <div
          className="sidebar-btn flex w-full justify-center items-center"
          onClick={toglemenuItem}
        >
          <span className="me-2 cursor-pointer">Menu</span>
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
          Role & Permission
        </Link>
        <Link to="/employee" className="sidebar-btn">
          Employee
        </Link>
        <Link to="/backlog" className="sidebar-btn">
          Backlog Module
        </Link>
        <div
          className="sidebar-btn flex w-full justify-center items-center"
          onClick={toggleSubmenu}
        >
          <span className="me-2 cursor-pointer">Attendance Module</span>
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
          Payroll
        </Link>
        <Link to="/logout" className="sidebar-btn">
          Logout
        </Link>
      </div>
    </div>
  );
}
