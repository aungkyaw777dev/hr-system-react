import { useDataStore } from "@/stores/useDataStore";

export const ProfileService = {
  fetchEmployee: async (employeeCode: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Employee/profile/${employeeCode}`,
      method: "GET",
    });
    return useDataStore.getState().data ?? {};
  },
  //Profile update is not available in the current API
  //   updateEmployee: async (employeeCode: string, payload: {}) => {
  //     await useDataStore.getState().fetchData({
  //       endPoint: `/Employee/update/${employeeCode}`,
  //       method: "PUT",
  //       body: payload,
  //     });
  //     return useDataStore.getState().data ?? {};
  //   },
};
