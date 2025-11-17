import { useDataStore } from "@/stores/useDataStore";

export const attendanceService = {

  fetchAttendanceRecords: async (name: string = "", pageNo: number = 1, pageSize: number = 100) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/AttendanceList?EmployeeName=${name}&pageNo=${pageNo}&pageSize=${pageSize}`,
    });
    return useDataStore.getState().data?.data?.attendanceList ?? [];
  },

  createAttendanceRecord: async (data: any) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/AttendanceCreate`,
      method: "POST",
      body: data,
    });
    return useDataStore.getState().data?.data ?? [];
  },

  updateAttendanceRecord: async (code: string, data: any) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/update/${code}`,
      method: "PUT",
      body: data,
    });
  },

  editAttendanceRecord: async (code: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/edit/${code}`,
      method: "GET",
    });
     return useDataStore.getState().data?.data ?? [];
  },

  deleteAttendanceRecord: async (code: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/delete/${code}`,
      method: "DELETE",
      body: { attendanceCode: code },
    });
    return useDataStore.getState().data?.data ?? [];
  },
};