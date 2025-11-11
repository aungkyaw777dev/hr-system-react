import { useDataStore } from "@/stores/useDataStore";

export const attendanceService = {

  fetchAttendanceRecords: async () => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/AttendanceList`,
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
      endPoint: `/Attendance/AttendanceUpdate`,
      method: "POST",
      body: data,
    });
  },

  editAttendanceRecord: async (code: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/AttendanceEdit?attendanceCode=${code}`,
    });
     return useDataStore.getState().data?.data ?? [];
  },

  deleteAttendanceRecord: async (code: string) => {
    await useDataStore.getState().fetchData({
      endPoint: `/Attendance/AttendanceDelete?attendanceCode=${code}`,
      method: "DELETE",
    });
  },
};