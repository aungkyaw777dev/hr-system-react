import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmployeeForm from "@/components/employee/EmployeeForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";

export default function EmployeeEditPage() {
  const navigate = useNavigate();
  const { code } = useParams();
  const location = useLocation();

  const employee = location.state?.employee; // from list page

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleSubmit = (values: any) => {
    console.log("Updating employee:", code, values);
    // Simulate successful update
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
        description="Employee has been updated successfully!"
      />
    </>
  );
}
