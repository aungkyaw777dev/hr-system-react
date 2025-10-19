import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationForm } from "./LocationForm";
import { SuccessDialog } from "../../../components/ui/SuccessDialog";

export default function LocationCreate() {
  const navigate = useNavigate();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleSubmit = (values: any) => {
    console.log("Create location:", values);

    // Add API call here
    // Simulate API success
    setTimeout(() => {
      setSuccessDialogOpen(true);
    }, 500);
  };

  const handleSuccessConfirm = () => {
    setSuccessDialogOpen(false);
    navigate("/location");
  };

  const handleCancel = () => {
    navigate("/location");
  };

  return (
    <>
      <LocationForm
        mode="add"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        onConfirm={handleSuccessConfirm}
      />
    </>
  );
}
