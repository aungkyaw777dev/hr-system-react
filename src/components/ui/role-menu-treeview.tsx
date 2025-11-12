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
import { roleMenuPermissionService } from "@/services/roleMenuPermissionService";

export default function RoleMenuPermissionPanel() {
  const [roleMenuPermission, setRoleMenuPermission] = useState([]);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  async function handleSave() {
    setSaving(true);
    try {
    } catch (err) {
      console.error(err);
      alert("Failed to save permissions");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    (async () => {
      const fetchRMP =
        await roleMenuPermissionService.fetchRoleMenuPermission();
      const fetchedRoles = await roleMenuPermissionService.fetchRoles();
      setRoleMenuPermission(fetchRMP);
      setRoles(fetchedRoles.items);
    })();
  }, []);

  return (
    <div className="pt-6 max-w-6xl mx-auto w-full flex">
      <div className="flex flex-col gap-3 mb-4 w-full">
        <Label className="mb-1">Role</Label>
        <Select onValueChange={(v) => setSelectedRole(v)}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select role">
              {roles
                ? roles.filter((r) => r.roleId === selectedRole)?.roleName
                : null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-full">
            {roles
              ? roles.map((r) => (
                  <SelectItem
                    key={r.roleId}
                    value={r.roleId}
                    className="w-full"
                  >
                    {r.roleName}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full">
        <Card className="border-none shadow-none">
          <CardContent>
            {roleMenuPermission.map((menuGroup) => (
              <div
                key={menuGroup.menuGroupCode}
                className="flex flex-col items-start justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <Checkbox className="data-[state=checked]:border-primary-500 border border-1  data-[state=checked]:text-primary-500" />
                  <div className="font-medium">{menuGroup.menuGroupCode}</div>
                </div>
                <div>
                  {menuGroup.childMenus.map((menu: any) => (
                    <div key={menu.menuItemCode}>
                      <div className="flex items-center gap-2 ps-4">
                        <Checkbox className="data-[state=checked]:border-primary-500 border border-1  data-[state=checked]:text-primary-500" />
                        <div className="font-medium">{menu.menuItemName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {roleMenuPermission.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">
                No menus matched.
              </div>
            )}
            <div className="flex gap-4">
              <div className="mt-4 flex">
                <Button className="outline-btn">Cancel</Button>
              </div>
              <div className="mt-4 flex">
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
