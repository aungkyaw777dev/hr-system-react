import { useNavigate } from "react-router-dom";
import EmployeeForm from "@/components/employee/EmployeeForm";

export default function EmployeeCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Creating new employee:", values);
    // API call to create
    navigate("/employee");
  };

  const handleCancel = () => navigate("/employee");

  return (
    <EmployeeForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
