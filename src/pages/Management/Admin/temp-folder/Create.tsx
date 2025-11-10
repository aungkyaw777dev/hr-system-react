import { RoleMenuTreeView } from "@/components/ui/role-menu-treeview"

export function RoleMenuTreeViewCreate() {
    return (
        <div className="flex justify-around w-full p-4">
            <div>
                <h1 className="font-bold">Role Menu Permission Information</h1>
            </div>
            <RoleMenuTreeView />
        </div>
    )
}