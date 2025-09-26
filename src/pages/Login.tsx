import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEyeOn, setIsEyeOn] = useState(true);
  const handleSubmit = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form action="" className="flex gap-2 flex-col w-[90%] md:w-[40%]">
        <h1 className="text-2xl font-bold mb-4 w-full">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <div className="relative w-full ">
          <Input
            type={isEyeOn ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isEyeOn ? (
            <Eye
              className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setIsEyeOn(!isEyeOn)}
            />
          ) : (
            <EyeClosed
              className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setIsEyeOn(!isEyeOn)}
            />
          )}
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
}
