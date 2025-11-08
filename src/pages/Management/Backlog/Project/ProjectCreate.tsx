// ProjectCreate.tsx
import { useNavigate } from "react-router-dom";
import { ProjectForm, type ProjectFormValues } from "./ProjectForm";
import { useDataStore } from "@/stores/useDataStore";

export function ProjectCreate() {
  const navigate = useNavigate();
  const { fetchData, loading, error } = useDataStore();

  return (
    <ProjectForm
      mode="create"
      submitting={loading}
      serverError={error ?? undefined}
      onCancel={() => navigate(-1)}
      onSubmit={async (vals: ProjectFormValues) => {
        const payload = {
          projectName: vals.name,
          projectDescription: vals.description || "",
          startDate: vals.start ? vals.start.toISOString() : null,
          endDate: vals.due ? vals.due.toISOString() : null,
          projectStatus: vals.status, // "Planned" | "InProgress" | "DONE"
        };

        const res = await fetchData({
          url: "http://localhost:5067/api/Project/create",
          method: "POST",
          body: payload,
        });
        console.log(res)

        if (res) {
          
          // success → go back to list
          navigate("/project");
        }
      }}
    />
  );
}
