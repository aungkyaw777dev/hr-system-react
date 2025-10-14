import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/index.css"
import { useState } from "react";
export default function MainLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex min-h-screen flex-col">
            <header className="h-[80px]">
                <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </header>
            <div className="flex flex-1">
                <aside className="w-64 lg:block z-20">
                    <Sidebar isOpen={isSidebarOpen} />
                </aside>
                <main className="flex-1">
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