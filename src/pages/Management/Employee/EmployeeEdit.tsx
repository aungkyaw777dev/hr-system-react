import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmployeeForm from "@/components/employee/EmployeeForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useDataStore } from "@/stores/useDataStore";

export default function EmployeeEditPage() {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const API_BASE = import.meta.env.VITE_API_URL;
  const { data, loading, fetchData } = useDataStore();

  // const [employee, setEmployee] = useState<any>(
  //   location.state?.employee || null
  // );
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchData({ url: `${API_BASE}/Employee/edit/${code}` });
        console.log("In the effect>>>>>>");
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      }
    };
    loadData();
  }, [fetchData]);

  console.log("EmployeeEditPage render:", data);

  // ✅ When store data updates, populate employee state
  // useEffect(() => {
  //   if (data && !employee && data.employeeCode === code) {
  //     setEmployee(data);
  //   }
  // }, [data, employee, code]);

  if (loading || !data) {
    return <div className="p-6 text-gray-600">Loading employee data...</div>;
  }

  // ✅ Handle form submission using native fetch()
  const handleSubmit = async (values: any) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/Employee/update/${code}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log("Update empdata", response);
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate("/employee");

  const handleSuccessConfirm = () => {
    setSuccessDialogOpen(false);
    navigate("/employee");
  };

  return (
    <>
      <EmployeeForm
        defaultValues={data}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={saving}
      />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        onConfirm={handleSuccessConfirm}
        description="Employee has been updated successfully!"
      />
    </>
  );
}
