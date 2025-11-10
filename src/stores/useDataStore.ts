import { create } from "zustand";

interface FetchConfig {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

interface DataStore {
  data: any;
  loading: boolean;
  error: string | null;
  fetchData: (config: FetchConfig) => Promise<any>;
  clearError: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: null,
  loading: false,
  error: null,

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

      const options: RequestInit = {
        method,
        headers: defaultHeaders,
        ...(body && { body: JSON.stringify(body) }),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      // Success ဖြစ်ရင်
      if (response.ok) {
        set({ data: data, loading: false, error: null });
        return data; // Return data for caller
      }
      // Error ဖြစ်ရင်
      else {
        // API က error message ပြန်လာရင်
        const errorMessage = data?.message || `API Error ${response.status}`;
        set({ error: errorMessage, loading: false, data: null });
        return null;
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Network error occurred";
      set({ error: errorMessage, loading: false, data: null });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
