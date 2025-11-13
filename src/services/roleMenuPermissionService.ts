import { useDataStore } from "@/stores/useDataStore";

export const roleMenuPermissionService = {

  fetchRoleMenuPermission: async () => {
    await  useDataStore.getState().fetchData({
      endPoint: `/role-menu-permission/menu-tree`,
    });
     return useDataStore.getState().data?.menuTree ?? [];
  },
  
  fetchRoles: async () => {
        await useDataStore.getState().fetchData({
            endPoint: `/Role/list`
        })
        return useDataStore.getState().data?.data ?? {}
    },
  

};
