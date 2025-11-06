import { Outlet } from "react-router-dom";
import illustrationUrl from "@/assets/bg-green.png";

export default function AuthLayout() {
  return (
    <div className="relative flex h-screen">
      <div className="hidden md:block md:w-[30%] bg-secondary-100 flex items-center justify-center">
      </div>
      <div className="w-full md:w-[70%]">
        <img src={illustrationUrl} alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-1/2 left-1/2 md:left-1/3 -translate-x-1/2  -translate-y-1/2 md:-translate-y-1/3 w-[80%] md:w-[30%]">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>

  );
}
