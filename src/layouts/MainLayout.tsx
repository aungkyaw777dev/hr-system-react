import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/index.css"
import { useState } from "react";
export default function MainLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex min-h-screen flex-col">
            <header className="h-[80px] flex-shrink-0 z-20 shadow-sm">
                <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </header>
            <div className="flex flex-1">
                <aside className={`w-[300px] bg-natural-50 text-text shadow-lg z-30
                    transition-transform duration-300
                    ${isSidebarOpen ? "relative" : "hidden lg:block"}
                    lg:translate-x-0
                `}>
                    <div className="h-full bg-primary overflow-y-auto">
                        <Sidebar />
                    </div>
                </aside>
                <main className="flex flex-1 bg-natural-100 overflow-y-auto">
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