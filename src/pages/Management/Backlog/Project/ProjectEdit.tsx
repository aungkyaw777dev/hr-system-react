import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectForm, type ProjectFormValues } from "./ProjectForm";
import { useDataStore } from "@/stores/useDataStore";
import { Button } from "@/components/ui/button";

type ApiProject = {
  id: string | number;
  projectCode?: string;
  projectName: string;
  projectDescription?: string | null;
  startDate?: string | null; // ISO from API
  endDate?: string | null; // ISO from API
  projectStatus: "Planned" | "InProgress" | "DONE";
};

export function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, fetchData } = useDataStore();

  const fetchUrl = useMemo(
    () => `http://localhost:5067/api/Project/edit/${id}`,
    [id]
  );

  // Load current project
  useEffect(() => {
    if (!id) return;
    fetchData({ url: fetchUrl }); // GET by default
  }, [id, fetchUrl, fetchData]);

  const proj = (data.data ?? null) as ApiProject | null;

  if (loading && !proj) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Project</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Project</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!proj) {
    return <div className="p-6">Project not found.</div>;
  }

  const initialValues: Partial<ProjectFormValues> = {
    code: proj.projectCode ?? "",
    name: proj.projectName ?? "",
    description: proj.projectDescription ?? "",
    status: proj.projectStatus ?? "",
    start: proj.startDate ? new Date(proj.startDate) : null,
    due: proj.endDate ? new Date(proj.endDate) : null,
  };

  return (
    <ProjectForm
      mode="edit"
      initialValues={initialValues}
      submitting={loading}
      serverError={error ?? undefined}
      onCancel={() => navigate(-1)}
      onSubmit={async (vals) => {
        // Build payload exactly as API expects
        const payload = {
          projectName: vals.name,
          projectDescription: vals.description || "",
          startDate: vals.start ? vals.start.toISOString() : null,
          endDate: vals.due ? vals.due.toISOString() : null,
          projectStatus: vals.status, // "Planned" | "InProgress" | "DONE"
        };

        const res = await fetchData({
          url: `http://localhost:5067/api/Project/update/${id}`,
          method: "PUT",
          body: payload,
        });

        if (res) navigate("/project");
      }}
    />
  );
}
