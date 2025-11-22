import { useEffect, useState } from "react";
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
import { Plus } from "lucide-react";
import { roleMenuPermissionService } from "@/services/roleMenuPermissionService";

// --------------------- Types ---------------------
interface MenuPermissionItem {
  menuGroupCode: string;
  menuItemCode: string | null;
  permissionCode: string | null;
  isChecked: boolean;
}

interface SavePermission {
  roleCode: string | null;
  menuPermissions: MenuPermissionItem[];
}

interface Permission {
  permissionId: string;
  permissionCode: string;
  permissionName: string;
}

interface Role {
  roleId: string;
  roleCode: string;
  roleName: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
  deleteFlag: boolean;
}
// --------------------- Component ---------------------
export default function RoleMenuPermissionPanel() {
  const [roleMenuPermission, setRoleMenuPermission] = useState<any[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [newPermissions, setNewPermissions] = useState<SavePermission>({
    roleCode: "",
    menuPermissions: [],
  });
  const [saving, setSaving] = useState(false);

  // --------------------- Fetch Data ---------------------
  useEffect(() => {
    (async () => {
      const fetchRMP = await roleMenuPermissionService.fetchRoleMenuPermission(
        selectedRole ?? ""
      );
      const fetchedRoles = await roleMenuPermissionService.fetchRoles();
      const fetchedPermissions =
        await roleMenuPermissionService.fetchPermissions();

      setRoleMenuPermission(fetchRMP ?? []);
      setRoles(fetchedRoles.items ?? []);
      setPermissions(fetchedPermissions ?? []);

      const flatPermissions: MenuPermissionItem[] = [];

      (fetchRMP ?? []).forEach((group: MenuPermissionItem) => {
        // If it has child menus
        if (group.childMenus?.length) {
          group.childMenus.forEach((menu: any) => {
            (fetchedPermissions ?? []).forEach((p: any) => {
              flatPermissions.push({
                menuGroupCode: group.menuGroupCode,
                menuItemCode: menu.menuItemCode,
                permissionCode: p.permissionCode,
                isChecked: menu.permissions?.includes(p.permissionCode),
              });
            });
          });

          return;
        }

        // DASHBOARD → no permission code
        if (group.menuGroupCode === "DASHBOARD") {
          flatPermissions.push({
            menuGroupCode: group.menuGroupCode,
            menuItemCode: null,
            permissionCode: null,
            isChecked: group.isChecked,
          });

          return;
        }

        // CompanyRules / Payroll → ONLY LIST + UPDATE
        if (
          group.menuGroupCode === "COMPANY_RULES" ||
          group.menuGroupCode === "PAYROLL"
        ) {
          ["LIST", "UPDATE"].forEach((code) => {
            flatPermissions.push({
              menuGroupCode: group.menuGroupCode,
              menuItemCode: null,
              permissionCode: code,
              isChecked: group.isChecked,
            });
          });
          return;
        }
        console.log(group.menuGroupCode);

        // Default behavior → loop all permissions
        (fetchedPermissions ?? []).forEach((p: any) => {
          flatPermissions.push({
            menuGroupCode: group.menuGroupCode,
            menuItemCode: null,
            permissionCode: p.permissionCode,
            isChecked: group.isChecked,
          });
          console.log(flatPermissions);
        });
      });

      setNewPermissions({
        roleCode: selectedRole ?? "",
        menuPermissions: flatPermissions,
      });
    })();
  }, [selectedRole]);

  // --------------------- Handlers ---------------------
  const handleSave = async () => {
    setSaving(true);
    try {
      await roleMenuPermissionService.savePermissions(newPermissions);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleMenuItem = (menuItemCode: string, value: boolean) => {
    setNewPermissions((prev) => ({
      ...prev,
      menuPermissions: prev.menuPermissions.map((mp) =>
        mp.menuItemCode === menuItemCode ? { ...mp, isChecked: value } : mp
      ),
    }));
  };

  const toggleMenuGroup = (menuGroupCode: string, value: boolean) => {
    setNewPermissions((prev) => ({
      ...prev,
      menuPermissions: prev.menuPermissions.map((mp) =>
        mp.menuGroupCode === menuGroupCode ? { ...mp, isChecked: value } : mp
      ),
    }));
  };

  const togglePermission = (
    menuItemCode: string | null,
    permissionCode: string,
    value: boolean
  ) => {
    setNewPermissions((prev) => ({
      ...prev,
      menuPermissions: prev.menuPermissions.map((mp) =>
        mp.menuItemCode === menuItemCode && mp.permissionCode === permissionCode
          ? { ...mp, isChecked: value }
          : mp
      ),
    }));
  };

  return (
    <div className="pt-6 max-w-6xl mx-auto w-full flex gap-6">
      {/* Role Selection */}
      <div className="flex flex-col gap-3 mb-4 w-64">
        <Label>Role</Label>
        <Select onValueChange={(v) => setSelectedRole(v)}>
          <SelectTrigger className="bg-white text-primary-700">
            <SelectValue placeholder="Select role">
              {roles && roles.find((r) => r.roleCode === selectedRole)
                ? roles.find((r) => r.roleCode === selectedRole)?.roleName
                : "Select Role"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-natural-50 text-primary-700 w-full">
            {roles.map((r) => (
              <SelectItem key={r.roleId} value={r.roleCode}>
                {r.roleName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Permissions Panel */}
      <div className="flex-1">
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col gap-4">
            {roleMenuPermission.length < 1 && (
              <div className="p-4 text-sm text-muted-foreground">
                No menus matched.
              </div>
            )}

            {roleMenuPermission.map((menuGroup) => {
              const groupChecked = newPermissions.menuPermissions.some(
                (mp) =>
                  (mp.menuGroupCode === menuGroup.menuGroupCode &&
                    mp.isChecked) ||
                  menuGroup.isChecked
              );

              return (
                <div className="flex gap-4" key={menuGroup.menuGroupCode}>
                  <div>
                    {menuGroup.childMenus.length ? (
                      <Plus className="text-primary-700 mt-3" />
                    ) : (
                      <div className="ms-6"></div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 p-3">
                    {/* Parent Menu */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        className="check-menus"
                        checked={groupChecked}
                        onCheckedChange={(v) =>
                          toggleMenuGroup(menuGroup.menuGroupCode, v === true)
                        }
                      />
                      <div className="font-medium">
                        {menuGroup.menuGroupCode}
                      </div>
                    </div>

                    {/* Child Menus */}
                    <div
                      className={
                        menuGroup.childMenus.length
                          ? "flex flex-col gap-2"
                          : "flex gap-2 ms-6"
                      }
                    >
                      {!!menuGroup.childMenus.length
                        ? menuGroup.childMenus.map((menu: any) => {
                            const menuChecked =
                              newPermissions.menuPermissions.some(
                                (mp) =>
                                  mp.menuItemCode === menu.menuItemCode &&
                                  mp.isChecked
                              );

                            return (
                              <div key={menu.menuItemCode}>
                                <div className="flex items-center ps-6 gap-2">
                                  {/* Child Menu Checkbox */}
                                  <Checkbox
                                    className="check-menus"
                                    checked={menuChecked}
                                    onCheckedChange={(v) =>
                                      toggleMenuItem(
                                        menu.menuItemCode,
                                        v === true
                                      )
                                    }
                                  />
                                  <div className="font-medium">
                                    {menu.menuItemName}
                                  </div>
                                </div>

                                {/* Individual Permissions */}
                                <div className="flex ps-12 gap-5 mt-1">
                                  {permissions.map((p: any) => {
                                    const permChecked =
                                      newPermissions.menuPermissions.some(
                                        (mp) =>
                                          mp.menuItemCode ===
                                            menu.menuItemCode &&
                                          mp.permissionCode ===
                                            p.permissionCode &&
                                          mp.isChecked
                                      );

                                    return (
                                      <div
                                        key={p.permissionCode}
                                        className="flex items-center gap-2"
                                      >
                                        <Checkbox
                                          className="check-menus"
                                          checked={permChecked}
                                          onCheckedChange={(v) =>
                                            togglePermission(
                                              menu.menuItemCode,
                                              p.permissionCode,
                                              v === true
                                            )
                                          }
                                        />
                                        <div className="font-medium">
                                          {p.permissionCode}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })
                        : permissions.map((p: any) => {
                            const permChecked =
                              newPermissions.menuPermissions.some(
                                (mp) =>
                                  mp.menuGroupCode ===
                                    menuGroup.menuGroupCode &&
                                  mp.permissionCode === p.permissionCode &&
                                  mp.isChecked
                              );

                            return (
                              menuGroup.menuGroupCode !== "DASHBOARD" && (
                                <div
                                  key={p.permissionCode}
                                  className="flex items-center gap-2"
                                >
                                  {["COMPANY_RULES", "PAYROLL"].includes(
                                    menuGroup.menuGroupCode
                                  ) ? (
                                    ["LIST", "UPDATE"].includes(
                                      p.permissionCode
                                    ) && (
                                      <div className="flex items-center gap-2">
                                        <Checkbox
                                          className="check-menus"
                                          checked={permChecked}
                                          onCheckedChange={(v) =>
                                            togglePermission(
                                              null,
                                              p.permissionCode,
                                              v === true
                                            )
                                          }
                                        />
                                        <div className="font-medium">
                                          {p.permissionCode}
                                        </div>
                                      </div>
                                    )
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <Checkbox
                                        className="check-menus"
                                        checked={permChecked}
                                        onCheckedChange={(v) =>
                                          togglePermission(
                                            null,
                                            p.permissionCode,
                                            v === true
                                          )
                                        }
                                      />
                                      <div className="font-medium">
                                        {p.permissionCode}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            );
                          })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <Button className="outline-btn">Cancel</Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="outline-btn"
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
