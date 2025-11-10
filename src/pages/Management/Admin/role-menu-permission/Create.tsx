import RoleMenuPermissionPanel from "@/components/ui/role-menu-treeview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export function RoleMenuTreeViewCreate() {
  return (
    <div className="flex flex-col w-full p-4">
      <RoleMenuPermissionPanel />
    </div>
  );
}
