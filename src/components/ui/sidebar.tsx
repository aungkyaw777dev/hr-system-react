import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubmenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState(false);
  const toglemenuItem = () => setIsSubMenuItemOpen(!isSubMenuItemOpen);
  const [isBackLogMenuOpen, setIsBackLogMenuOpen] = useState(false);
  const toggleSubmenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  const toggleBackLogMenu = () => setIsBackLogMenuOpen(!isBackLogMenuOpen);
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
        <Link to="/menu" className="sidebar-btn">
          {" "}
          Menu
        </Link>
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
        <div
          className="sidebar-btn flex w-full justify-center items-center"
          onClick={toggleBackLogMenu}
        >
          <span className="me-2 cursor-pointer">Backlog Module</span>
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
