import { useDataStore } from "@/stores/useDataStore";

type ApiEnvelope<T = unknown> = {
  isSuccess?: boolean;
  message?: string;
  data?: T;
  [k: string]: unknown;
};

const asApi = <T = unknown>(x: unknown): ApiEnvelope<T> => x as ApiEnvelope<T>;

export type MenuGroupListParams = {
  pageNo: number;
  pageSize: number;
};

export type MenuGroupItem = {
  menuGroupId: string;
  menuGroupCode: string;
  menuGroupName: string;
  hasMenuItem: boolean;
  url: string;
  icon: string;
  sortOrder: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
  deleteFlag: boolean;
};

export type MenuGroupListData = {
  items: MenuGroupItem[];
  totalCount: number;
  pageNo: number;
  pageSize: number;
};

type Payload = {
  menuGroupCode?: string;
  menuGroupName: string;
  url: string;
  icon: string;
  sortOrder: number | null | undefined;
  hasMenuItem: boolean;
};

// Service
export const menuGroupService = {
  // GET /MenuGroup/list?PageNo=1&PageSize=10
  fetchMenuGroups: async (
    params: MenuGroupListParams,
    headers?: Record<string, string>
  ): Promise<ApiEnvelope<MenuGroupItem[] | MenuGroupListData>> => {
    const qs = new URLSearchParams({
      PageNo: String(params.pageNo),
      PageSize: String(params.pageSize),
    }).toString();

    await useDataStore.getState().fetchData({
      endPoint: `/MenuGroup/list?${qs}`,
      headers,
    });

    return asApi<MenuGroupItem[] | MenuGroupListData>(
      useDataStore.getState().data as unknown
    );
  },

  // GET /MenuGroup/edit:code
  fetchMenuGroupsByCode: async (
    code: string,
    headers?: Record<string, string>
  ): Promise<ApiEnvelope<MenuGroupItem>> => {
    await useDataStore.getState().fetchData({
      endPoint: `/MenuGroup/edit/${encodeURIComponent(code)}`,
      headers,
    });
    return asApi<MenuGroupItem>(useDataStore.getState().data as unknown);
  },

  // POST /MenuGroup/create
  createMenuGroup: async (
    payload: Payload,
    headers?: Record<string, string>
  ): Promise<ApiEnvelope<boolean> | null> => {
    await useDataStore.getState().fetchData({
      endPoint: `/MenuGroup/create`,
      method: "POST",
      body: payload,
      headers,
    });

    const resp = asApi<boolean>(useDataStore.getState().data as unknown);

    if (resp?.isSuccess === false) {
      useDataStore.setState({ error: resp.message || "Create failed" });
      return null;
    }
    return resp;
  },

  // PUT /MenuGroup/update/:code
  updateMenuGroup: async (
    code: string,
    payload: Payload,
    headers?: Record<string, string>
  ): Promise<ApiEnvelope<boolean> | null> => {
    await useDataStore.getState().fetchData({
      endPoint: `/MenuGroup/update/${encodeURIComponent(code)}`,
      method: "PUT",
      body: payload,
      headers,
    });

    const resp = asApi<boolean>(useDataStore.getState().data as unknown);

    if (resp?.isSuccess === false) {
      useDataStore.setState({ error: resp.message || "Update failed" });
      return null;
    }
    return resp;
  },

  // DELETE /MenuGroup/delete/:code
  deleteMenuGroup: async (
    code: string,
    headers?: Record<string, string>
  ): Promise<ApiEnvelope<boolean>> => {
    await useDataStore.getState().fetchData({
      endPoint: `/MenuGroup/delete/${encodeURIComponent(code)}`,
      method: "DELETE",
      headers,
    });

    return asApi<boolean>(useDataStore.getState().data as unknown);
  },
};
