// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface User {
    createAat: string,
    email: string,
    employeeCode: string,
    name: string,
    phoneNo: string,
    profileImage: string,
    roleName: string,
    username: string
}
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: Object | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    setUser: (user: User) => void;
    setError: (error: Object) => void;
    getUser: () => User | null;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: true,
            error : null,
            setUser: (user) => set({ user }),
            setError: (error) => set({error}),
            setToken: (token) => set({ token }),
            clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
            getUser: () => get().user,
            login: async (username, password) => {
                try {
                    const res = await fetch(`/api/Auth/Login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password }),
                    });

                    if (!res.ok) throw new Error("Invalid credentials");
                    const data = await res.json();
                    const { user, token, refreshToken } = data.data;
                    set({ user, token, isAuthenticated: true })
                    localStorage.setItem("refreshToken", refreshToken);

                    return true;
                } catch (error:any) {
                    if(error)
                        set({ error: { message: error || "Login failed" } });
                    throw error
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
                    const res = await fetch(`/api/auth/refresh-token`, {
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
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
