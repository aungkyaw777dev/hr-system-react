import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import {
  Outlet,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import "../styles/index.css";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const authStore = useAuthStore();
  const from = location.pathname || "/employee";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    async function check() {
      try {
        const isStayedLogin = await authStore.checkAuth();
        if (!isStayedLogin) {
          navigate("/", { replace: true });
          return;
        }
        console.log("here", from);
        navigate(from, { replace: true });
      } catch (error) {
        navigate("/", { replace: true });
      }
    }
    check();
  }, []);
  return (
    <div className="flex h-screen flex-col overflow-hiden">
      <header className="h-[60px] flex-shrink-0 z-20 shadow-sm">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-[300px] bg-natural-50 text-text shadow-lg z-30
                    transition-transform duration-300
                    ${
                      isSidebarOpen
                        ? "fixed top-0 h-full overflow-y-auto overflow-x-hidden"
                        : "hidden lg:block max-h-[100vh-60px] overflow-y-auto"
                    }
                    lg:translate-x-0
                `}
        >
          <div
            className={`${
              isSidebarOpen
                ? "sticky inset-0 flex justify-between p-2 items-center bg-natural-50"
                : "hidden"
            }`}
          >
            <img src={Logo} alt="logo" className="w-30" />
            <X
              className="me-2 cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="h-full w-full bg-primary flex justify-center mt-5">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-natural-100">
          <Outlet />
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
