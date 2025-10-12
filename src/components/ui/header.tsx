import { Bell } from 'lucide-react';
import { CircleUser } from 'lucide-react';
export default function Header() {
    return (
        <div className="bg-primary flex justify-between items-center text-white p-2 h-full">
            <div className='cursor-pointer text-2xl ps-4'>Logo</div>
            <div className='flex gap-2 text-2xl'>
                <Bell className='cursor-pointer px-4' />
                <CircleUser className='cursor-pointer' />
            </div>
        </div>
    )
}