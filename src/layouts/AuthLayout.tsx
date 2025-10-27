import { Outlet } from "react-router-dom";
import illustrationUrl from "@/assets/forgot-illustration.png";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen md:grid-cols-2 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="flex items-center justify-center p-6 md:p-10">
        <Outlet />
      </div>

      <div className="relative hidden md:block">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-600 via-teal-500 to-violet-600" />
        <img
          src={illustrationUrl}
          alt="People collaborating illustration"
          className="h-full w-full object-cover object-center mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>
    </div>
  );
}
