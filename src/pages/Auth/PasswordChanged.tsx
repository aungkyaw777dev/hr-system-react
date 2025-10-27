// src/pages/Auth/PasswordChanged.tsx
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PasswordChanged() {
  const navigate = useNavigate();

  return (
      <>
        <Card className="w-full max-w-md px-8 pt-14 pb-10 shadow-lg border-0 rounded-2xl bg-[#CED7D3] backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto  rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-[72px] w-[72px] text-black" />
            </div>
            <CardTitle className="text-2xl text-black">
              Password Changed
            </CardTitle>
            <CardDescription className="text-[#62748E]">
              Your password is changed successfully.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              className="w-full h-11 bg-primary-500 text-sm text-neutral-50 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Continue
            </Button>


            <div className="flex items-center justify-center gap-4 text-[#99A1AF] text-sm">
              <Link to="#" className="hover:underline">
                Terms of Use
              </Link>
              <span className="select-none">|</span>
              <Link to="#" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>
      </>

      
  );
}
