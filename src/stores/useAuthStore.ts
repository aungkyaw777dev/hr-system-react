// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    roleName: string | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    setRole: (roleName: string) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

// Adjust your backend base URL
const API_BASE = import.meta.env.VITE_API_URL

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            roleName: null,
            token: null,
            isAuthenticated: false,
            loading: true,

            setRole: (roleName) => set({ roleName }),
            setToken: (token) => set({ token }),
            clearAuth: () => set({ roleName: null, token: null, isAuthenticated: false }),

            login: async (username, password) => {
                try {
                    const res = await fetch(`${API_BASE}/Auth/Login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password }),
                    });

                    if (!res.ok) throw new Error("Invalid credentials");
                    const data = await res.json();
                    const { roleName, token, refreshToken } = data.data;
                    set({ roleName, token, isAuthenticated: true })
                    localStorage.setItem("refreshToken", refreshToken);

                    return true;
                } catch (error) {
                    console.error("Login error:", error);
                    return false;
                }
            },

            logout: async () => {
                set({ token: null, isAuthenticated: false });
                localStorage.removeItem("refreshToken");
                window.location.href = "/";
            },

            checkAuth: async () => {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    set({ loading: false });
                    return false;
                }

                try {
                    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
                        method: "POST",
                        headers: { Authorization: `Bearer ${refreshToken}` },
                    });

                    if (!res.ok) throw new Error("Failed to refresh");

                    const { token, refreshToken: newRefresh } = await res.json();

                    set({ token, isAuthenticated: true });
                    localStorage.setItem("refreshToken", newRefresh);

                    return true;
                } catch (error) {
                    set({ token: null, isAuthenticated: false });
                    return false;
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: "auth-storage", // localStorage key
            partialize: (state) => ({
                token: state.token,
                roleName: state.roleName,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
