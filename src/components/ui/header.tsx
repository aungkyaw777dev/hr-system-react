import { Bell } from 'lucide-react';
import { CircleUser, Menu } from 'lucide-react';
import logo from "../../assets/logo.png"
interface HeaderProps {
    onToggleSidebar: () => void;
}
export default function Header({ onToggleSidebar }: HeaderProps) {
    return (
        <div className="bg-natural-50 flex justify-between items-center text-text h-full">
            <div className='cursor-pointer text-2xl ps-8 flex gap-3 justify-center items-center'>
                <Menu className='md:d-block lg:hidden' onClick={onToggleSidebar} />
                <img src={logo} alt="logo" />
            </div>
            <div className='flex gap-4 text-2xl me-4'>
                <Bell className='cursor-pointer me-2' />
                <CircleUser className='cursor-pointer' />
            </div>
        </div>
    )
}