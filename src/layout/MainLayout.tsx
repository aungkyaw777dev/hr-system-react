import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/index.css"
export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="h-[80px]">
                <Header />
            </header>
            <div className="flex h-[calc(100vh-80px)]">
                <aside className="w-64 overflow-auto">
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}