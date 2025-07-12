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
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/login", userData, {
            withCredentials: true,
          });
          set({
            user: response.data.user,
            isAuthenticated: true,
            loading: false,
          });
          return response.data;
        } catch (error) {
          console.error("Login failed:", error);
          set({
            error:
              error.response?.data?.message || "Login failed. Try again later.",
            loading: false,
          });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/signup", userData);
          set({ user: response.data.user, loading: false });
          return response.data;
        } catch (error) {
          console.error("Registration failed:", error);
          set({
            error:
              error.response?.data?.message ||
              "Registration failed. Try again.",
            loading: false,
          });
          throw error;
        }
      },

      verifyEmail: async (token, email) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/verifyEmail", {
            token,
            email,
          });
          set({ user: response.data.user, loading: false });
          return response.data;
        } catch (error) {
          console.error("Email verification failed:", error);
          set({
            error:
              error.response?.data?.message || "Email verification failed.",
            loading: false,
          });
          throw error;
        }
      },

      resendVerification: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/resendVerification", {
            email,
          });
          set({ loading: false });
          return response.data;
        } catch (error) {
          console.error("Resend verification failed:", error);
          set({
            error:
              error.response?.data?.message || "Resend verification failed.",
            loading: false,
          });
          throw error;
        }
      },

      forgotpassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/forgotPassword", { email });
          set({ loading: false });
          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      resetpassword: async (password, token) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post(`/auth/resetPassword/:${token}`, { password });
          set({ loading: false });
          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await api.post("/auth/logout", {}, { withCredentials: true });
          set({ user: null, isAuthenticated: false, loading: false });
        } catch (error) {
          console.error("Logout failed:", error);
          set({
            error: error.response?.data?.message || "Logout failed.",
            loading: false,
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
