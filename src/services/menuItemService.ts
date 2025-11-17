import { useDataStore } from "@/stores/useDataStore";
export const MenuItemService = {
  fetchMenuItems: async (name: string, pageNo: number, pageSize: number) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Menu/list?MenuName=${name}&PageNo=${pageNo}&PageSize=${pageSize}`,
    });

    console.log("Fetched Menu Items:", useDataStore.getState().data);
    return useDataStore.getState().data ?? {};
  },

  fetchRoles: async () => {
    await useDataStore.getState().fetchData({
      endPoint: `/Role/list`,
    });
    return useDataStore.getState().data ?? {};
  },

  createMenuItem: async (payload: {}) => {
    await useDataStore.getState().fetchData({
      endPoint: "/Menu/create",
      method: "POST",
      body: payload,
    });
  },
  fetchMenuItem: async (menuCode: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Menu/edit/${menuCode}`,
      method: "GET",
    });
    console.log("Fetched Menu Item:", useDataStore.getState().data);
    return useDataStore.getState().data ?? {};
  },
  updateEmployee: async (employeeCode: string, payload: {}) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Employee/update/${employeeCode}`,
      method: "PUT",
      body: payload,
    });
    return useDataStore.getState().data ?? {};
  },
  deleteEmployee: async (employeeCode: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Employee/delete/${employeeCode}`,
      method: "DELETE",
    });
    return useDataStore.getState().data ?? {};
  },
};
