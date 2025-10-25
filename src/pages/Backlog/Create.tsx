import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BacklogForm from "../../components/ui/backlogForm";
import { SuccessDialog } from "../../components/ui/SuccessDialog";

export function BacklogCreate() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (values: unknown) => {
    console.log("Creating backlog:", values);
    // Add your API call here
    setShowSuccessModal(true);
  };

  return (
    <>
      <BacklogForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/backlog")}
      />

      <SuccessDialog
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        onConfirm={() => navigate("/backlog")}
        title="Create Successful!"
        description="New backlog item has been added successfully."
      />
    </>
  );
}