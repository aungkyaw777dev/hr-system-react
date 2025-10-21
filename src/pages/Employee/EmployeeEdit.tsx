import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmployeeForm from "@/components/employee/EmployeeForm";

export default function EmployeeEditPage() {
  const navigate = useNavigate();
  const { code } = useParams();
  const location = useLocation();

  const employee = location.state?.employee; // from list page

  const handleSubmit = (values) => {
    console.log("Updating employee:", code, values);
    // API call to update employee by code
    navigate("/employee");
  };

  const handleCancel = () => navigate("/employee");

  return (
    <EmployeeForm
      mode="edit"
      defaultValues={employee}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
