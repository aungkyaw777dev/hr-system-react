// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    name: string;
    role: "admin" | "hr" | "employee";
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

// Adjust your backend base URL
const API_BASE = import.meta.env.VITE_API_URL

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: true,

            setUser: (user) => set({ user, isAuthenticated: true }),
            setToken: (token) => set({ token }),
            clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),

            login: async (email, password) => {
                try {
                    const res = await fetch(`${API_BASE}/Auth/Login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!res.ok) throw new Error("Invalid credentials");
                    const { token, user, refreshToken } = await res.json();

                    set({ token, user, isAuthenticated: true });
                    localStorage.setItem("refreshToken", refreshToken);

                    return true;
                } catch (error) {
                    console.error("Login error:", error);
                    return false;
                }
            },

            logout: async () => {
                set({ user: null, token: null, isAuthenticated: false });
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

                    const { token, user, refreshToken: newRefresh } = await res.json();

                    set({ token, user, isAuthenticated: true });
                    localStorage.setItem("refreshToken", newRefresh);

                    return true;
                } catch (error) {
                    set({ user: null, token: null, isAuthenticated: false });
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
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
