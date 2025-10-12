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
            <div className="flex flex-1">
                <aside className="w-64">
                    <Sidebar />
                </aside>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}