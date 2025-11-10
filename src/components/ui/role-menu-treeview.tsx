import { useEffect, useState } from "react";

// shadcn/ui components (assumed available in the environment)
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function RoleMenuPermissionPanel() {
  // Mock data (would come from an API in a real app)
  const [roles, setRoles] = useState([
    { id: "r1", name: "Admin" },
    { id: "r2", name: "Manager" },
    { id: "r3", name: "Employee" },
  ]);

  const [menus, setMenus] = useState([
    { id: "m1", name: "Dashboard" },
    { id: "m6", name: "Role" },
    { id: "m2", name: "Employees" },
    { id: "m3", name: "Attendance" },
    { id: "m4", name: "Reports" },
    { id: "m5", name: "Settings" },
  ]);

  // permissions: { [roleId]: Set(menuId) }
  const [permissions, setPermissions] = useState(() => ({
    r1: new Set(["m1", "m2", "m3", "m4", "m5"]),
    r2: new Set(["m1", "m2", "m3"]),
    r3: new Set(["m1"]),
  }));

  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // ensure selectedRole exists after (fake) data changes
    if (!roles.find((r) => r.id === selectedRole)) {
      setSelectedRole(roles[0]?.id ?? null);
    }
  }, [roles, selectedRole]);

  function togglePermission(roleId: string, menuId: string) {
    setPermissions((prev) => {
      const clone = { ...prev };
      const setForRole = new Set(clone[roleId] ?? []);
      if (setForRole.has(menuId)) setForRole.delete(menuId);
      else setForRole.add(menuId);
      clone[roleId] = setForRole;
      return clone;
    });
  }

  function isAllowed(roleId: string, menuId: string) {
    return !!permissions[roleId] && permissions[roleId].has(menuId);
  }

  function toggleAllForRole(roleId: string, enable: boolean) {
    setPermissions((prev) => {
      const clone = { ...prev };
      if (enable) clone[roleId] = new Set(menus.map((m) => m.id));
      else clone[roleId] = new Set();
      return clone;
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Build a payload that's serializable (convert Sets to arrays)
      const payload = Object.fromEntries(
        Object.entries(permissions).map(([roleId, set]) => [
          roleId,
          Array.from(set),
        ])
      );

      // Mock API call
      await new Promise((res) => setTimeout(res, 700));
      // In a real app: await fetch('/api/permissions', { method: 'POST', body: JSON.stringify(payload) })

      alert("Permissions saved (mock). Payload logged to console.");
      console.log("Saved payload", payload);
    } catch (err) {
      console.error(err);
      alert("Failed to save permissions");
    } finally {
      setSaving(false);
    }
  }

  const filteredMenus = menus.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto w-full flex">
      <div className="flex flex-col gap-3 mb-4 w-full">
        <Label className="mb-1">Role</Label>
        <Select onValueChange={(v) => setSelectedRole(v)}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select role">
              {roles.find((r) => r.id === selectedRole)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="border-none shadow-none">
          <CardContent>
            {filteredMenus.map((menu) => (
              <div
                key={menu.id}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="border-primary-500 border border-2"
                    id={`chk-${selectedRole}-${menu.id}`}
                    checked={isAllowed(selectedRole, menu.id)}
                    onCheckedChange={() =>
                      togglePermission(selectedRole, menu.id)
                    }
                  />
                  <div className="font-medium">{menu.name}</div>
                </div>
              </div>
            ))}

            {filteredMenus.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">
                No menus match your search.
              </div>
            )}
            <div className="flex gap-4">
              <div className="mt-4 flex justify-end">
                <Button className="outline-btn">Cancel</Button>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="outline-btn"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
