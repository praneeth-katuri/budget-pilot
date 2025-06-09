import { create } from "zustand";
import api from "@/services/api/api";
import { setupInterceptors } from "@/services/api/apiInterceptor";

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user: user }),
  setIsLoading: (value) => set({ isLoading: value }),

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const accessToken = res.data.accessToken;
    const user = res.data.user;

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    localStorage.setItem("hasSession", "true");

    set({
      accessToken: accessToken,
      user: user,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {});
    } catch (err) {
      console.warn("Logout request failed: ", err.message);
    } finally {
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem("hasSession");
      set({ user: null, accessToken: null, isAuthenticated: false });
    }
  },

  refresh: async () => {
    try {
      const res = await api.get("/auth/refresh");
      const accessToken = res.data.accessToken;
      const user = res.data.user;

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      set({
        user: user,
        accessToken: accessToken,
        isAuthenticated: true,
      });
    } catch (err) {
      console.warn("Token refresh failed:", err.message);
      localStorage.removeItem("hasSession");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  initializeInterceptors: () =>
    setupInterceptors(get().setAccessToken, get().logout),
}));
