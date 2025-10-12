import { Bell } from 'lucide-react';
import { CircleUser } from 'lucide-react';
export default function Header() {
    return (
        <div className="bg-primary flex justify-between items-center text-white h-full">
            <div className='cursor-pointer text-2xl ps-4'>Logo</div>
            <div className='flex gap-4 text-2xl'>
                <Bell className='cursor-pointer' />
                <CircleUser className='ms-4 cursor-pointer' />
            </div>
        </div>
    )
}