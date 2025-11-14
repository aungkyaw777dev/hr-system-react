import { useDataStore } from "@/stores/useDataStore";

export const LocationService = {
  fetchLocations: async (
    name: string = "",
    pageNo: number = 1,
    pageSize: number = 10
  ) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Location/list?LocationName=${name}&PageNo=${pageNo}&PageSize=${pageSize}`,
    });
    return useDataStore.getState().data ?? {};
  },

  fetchLocation: async (locationCode: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Location/edit/${locationCode}`,
      method: "GET",
    });
    return useDataStore.getState().data ?? {};
  },

  createLocation: async (payload: {}) => {
    await useDataStore.getState().fetchData({
      endPoint: "/Location/create",
      method: "POST",
      body: payload,
    });
  },

  updateLocation: async (locationCode: string, payload: {}) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Location/update/${locationCode}`,
      method: "PUT",
      body: payload,
    });
  },

  deleteLocation: async (locationCode: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Location/delete/${locationCode}`,
      method: "DELETE",
    });
  },
};
