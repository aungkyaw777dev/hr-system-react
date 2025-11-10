import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationForm } from "./LocationForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useDataStore } from "@/stores/useDataStore";

export default function LocationCreate() {
  const navigate = useNavigate();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { fetchData, error} = useDataStore();

  const handleSubmit = async (values: any) => {
    console.log("Create location:", values);

   try {
     const result = await fetchData({
       url: `${import.meta.env.VITE_API_URL}/Location/create`,
       method: "POST",
       body: values,
     });
     
     if (result?.isSuccess) setSuccessDialogOpen(true);
   } catch (error) {
    console.log(error);
   }
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
        error={error}
      />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        onConfirm={handleSuccessConfirm}
      />
    </>
  );
}
