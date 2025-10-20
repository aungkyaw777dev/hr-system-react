import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BacklogForm from "../../components/ui/backlogForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { ThumbsUp } from "lucide-react";

export function BacklogCreate() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (values: any) => {
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

      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="max-w-md bg-primary-50">
          <div className="absolute left-1/2 -translate-x-1/2 top-[-15%] bg-primary-100 rounded-full p-3">
            <ThumbsUp className="h-15 w-15 text-primary-400 m-auto" />
          </div>
          <AlertDialogDescription className="text-center text-lg font-semibold mt-10 mb-3">
            Create Successful!
          </AlertDialogDescription>
          <AlertDialogCancel
            onClick={() => navigate("/backlog")}
            className="m-auto w-40 bg-primary-400 text-white hover:bg-primary-500 hover:text-white"
          >
            OK
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}