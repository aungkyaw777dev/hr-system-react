import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocationForm } from "./LocationForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useDataStore } from "@/stores/useDataStore";

export default function LocationEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [locationData, setLocationData] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { fetchData, error, clearError } = useDataStore();

  useEffect(() => {
    const handleEdit = async (id: string) => {
      clearError();
      const result = await fetchData({
        url: `${import.meta.env.VITE_API_URL}/Location/edit/${id}`,
      });

      if (result?.isSuccess && result?.data) {
        const location = result.data;

        setLocationData({
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
          radius: location.radius,
        });
      }
    };
    handleEdit(id);
  }, [id]);

  const handleSubmit = async (values: any) => {
    // console.log("Update location:", id, values);

    const result = await fetchData({
      url: `${import.meta.env.VITE_API_URL}/Location/update/${id}`,
      method: "PUT",
      body: values,
    });
    if (result?.isSuccess) {
      setSuccessDialogOpen(true);
    }
  };

  const handleSuccessConfirm = () => {
    setSuccessDialogOpen(false);
    navigate("/location");
  };

  const handleCancel = () => {
    navigate("/location");
  };

  if (error) return <div>Error: {error}</div>;
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
