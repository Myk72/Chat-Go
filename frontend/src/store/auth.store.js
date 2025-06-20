import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";


export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (userData) => {
        try {
          const response = await api.post("/auth/login", userData, {
            withCredentials: true,
          });
          set({ user: response.data.user, isAuthenticated: true });
          return response.data;
        } catch (error) {
          console.error("Login failed:", error);
          set({
            error:
              error.response?.data?.message || "Login failed. Try again later.",
          });
          throw error;
        }
      },

      signup: async (userData) => {
        try {
          const response = await api.post("/auth/signup", userData);
          set({ user: response.data.user });
          return response.data;
        } catch (error) {
          console.error("Registration failed:", error);
          set({
            error:
              error.response?.data?.message || "Registration failed. Try again.",
          });
          throw error;
        }
      },

      verifyEmail: async (token, email) => {
        try {
          const response = await api.post("/auth/verifyEmail", { token, email });
          set({ user: response.data.user });
          return response.data;
        } catch (error) {
          console.error("Email verification failed:", error);
          set({
            error:
              error.response?.data?.message || "Email verification failed.",
          });
          throw error;
        }
      },

      resendVerification: async (email) => {
        try {
          const response = await api.post("/auth/resendVerification", { email });
          return response.data;
        } catch (error) {
          console.error("Resend verification failed:", error);
          set({
            error:
              error.response?.data?.message || "Resend verification failed.",
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout", {}, { withCredentials: true });
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Logout failed:", error);
          set({
            error: error.response?.data?.message || "Logout failed.",
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
