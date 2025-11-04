import { useNavigate, useParams } from "react-router-dom";
import { LocationForm } from "./LocationForm";
import { useState, useEffect } from "react";

export default function LocationDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    // Fetch location data by ID
    // This is mock data - replace with actual API call
    const mockData = {
      name: "Insein",
      latitude: "16.9028",
      longitude: "96.1317",
      radius: "3.5",
    };
    setLocationData(mockData);
  }, [id]);

  const handleBack = () => {
    navigate("/location");
  };

  if (!locationData) return <div>Loading...</div>;

  return (
    <LocationForm
      mode="detail"
      locationData={locationData}
      onBack={handleBack}
    />
  );
}
