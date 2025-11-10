import { create } from "zustand";

interface FetchConfig {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}
interface DataStore {
  data: any[];
  loading: boolean;
  error: string | null;
  fetchData: (config: FetchConfig) => Promise<any>;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  loading: false,
  error: null,

  // Fetch data from API
  fetchData: async ({
    url,
    method = "GET",
    body,
    headers = {},
  }: FetchConfig) => {
    set({ loading: true, error: null });
    try {
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...(headers || {}),
      };

      const options = {
        method,
        headers: defaultHeaders,
        ...(body && { body: JSON.stringify(body) }),
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      set({ data: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
