import { Bell } from 'lucide-react';
import { CircleUser, Menu } from 'lucide-react';

interface HeaderProps {
    onToggleSidebar: () => void;
}
export default function Header({ onToggleSidebar }: HeaderProps) {
    return (
        <div className="bg-primary flex justify-between items-center text-white h-full">
            <div className='cursor-pointer text-2xl ps-4 flex gap-3 items-center'>
                <Menu className='md:d-block lg:hidden' onClick={onToggleSidebar} />
                <span>Logo</span>
            </div>
            <div className='flex gap-4 text-2xl me-4'>
                <Bell className='cursor-pointer me-2' />
                <CircleUser className='cursor-pointer' />
            </div>
        </div>
    )
}