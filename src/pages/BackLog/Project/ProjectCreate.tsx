import { useNavigate } from "react-router-dom";
import { ProjectForm } from "./ProjectForm";

export function ProjectCreate() {
  const navigate = useNavigate();
  return (
    <ProjectForm
      mode="create"
      onCancel={() => navigate(-1)}
      onSubmit={(vals) => {
        console.log("Create:", vals);
        navigate("/projects");
      }}
    />
  );
}
