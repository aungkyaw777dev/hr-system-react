import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/index.css"
import { useState } from "react";
export default function MainLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex min-h-screen flex-col">
            <header className="h-[80px] flex-shrink-0 z-20">
                <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </header>
            <div className="flex flex-1">
                <aside className={`w-64 bg-white shadow-lg z-30
                    transition-transform duration-300
                    ${isSidebarOpen ? "fixed top-[80px] left-0 h-[calc(100vh-80px)]" : "hidden lg:block"}
                    lg:translate-x-0
                `}>
                    <div className="h-full overflow-y-auto text-white bg-primary">
                        <Sidebar />
                    </div>
                </aside>
                <main className="flex flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    )
}