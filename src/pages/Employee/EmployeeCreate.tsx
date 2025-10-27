import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "@/components/employee/EmployeeForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";

export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleSubmit = (values) => {
    console.log("Creating new employee:", values);
    // Simulate successful API call
    setTimeout(() => {
      setSuccessDialogOpen(true);
    }, 500);
  };

  const handleCancel = () => navigate("/employee");

  const handleSuccessConfirm = () => {
    setSuccessDialogOpen(false);
    navigate("/employee");
  };

  return (
    <>
      <EmployeeForm onSubmit={handleSubmit} onCancel={handleCancel} />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        onConfirm={handleSuccessConfirm}
        description="Employee has been created successfully!"
      />
    </>
  );
}
