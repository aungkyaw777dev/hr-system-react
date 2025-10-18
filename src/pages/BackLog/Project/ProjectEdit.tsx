import { useNavigate, useParams } from "react-router-dom";
import { demoProjects } from "./Index";
import { ProjectForm } from "./ProjectForm";

export function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = demoProjects.find((p) => String(p.id) === String(id));

  if (!project) return <div className="p-6">Project not found.</div>;

  return (
    <ProjectForm
      mode="edit"
      initialValues={{
        code: project.code,
        name: project.name,
        status: project.status,
        startDate: project.startDate,
        dueDate: project.endDate,
      }}
      onCancel={() => navigate(-1)}
      onSubmit={(vals) => {
        console.log("Update:", id, vals);
        navigate("/projects");
      }}
    />
  );
}
