import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocationForm } from "./LocationForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";

export default function LocationEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [locationData, setLocationData] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch location data by ID
    const mockData = {
      name: "Insein",
      latitude: "16.9028",
      longitude: "96.1317",
      radius: "3.5",
    };
    setLocationData(mockData);
  }, [id]);

  const handleSubmit = (values: any) => {
    console.log("Update location:", id, values);

    // Add API call here
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

  if (!locationData) return <div>Loading...</div>;

  return (
    <>
      <LocationForm
        mode="edit"
        locationData={locationData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        onConfirm={handleSuccessConfirm}
        description="Location has been updated successfully."
      />
    </>
  );
}
