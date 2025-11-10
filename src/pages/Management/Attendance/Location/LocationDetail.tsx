import { useNavigate, useParams } from "react-router-dom";
import { LocationForm } from "./LocationForm";
import { useState, useEffect } from "react";
import { useDataStore } from "@/stores/useDataStore";

export default function LocationDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [locationData, setLocationData] = useState(null);
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

  const handleBack = () => {
    navigate("/location");
  };

  if (error) return <div>Error: {error}</div>;
  if (!locationData) return <div>Loading...</div>;

  return (
    <LocationForm
      mode="detail"
      locationData={locationData}
      onBack={handleBack}
    />
  );
}
