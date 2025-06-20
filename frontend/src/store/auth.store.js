import { create } from "zustand";
import { api } from "@/lib/api";
import { LogOut } from "lucide-react";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (userData) => {
    try {
      const response = await api.post("/auth/login", userData);
      set({ user: response.data.user, isAuthenticated: true });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      set({ error: error.data.message || "Login failed" });
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
      set({ error: error.data.message || "Registration failed" });
      throw error;
    }
  },

  verifyEmail: async (token, email) => {
    console.log(token, email);
    try {
      const response = await api.post("/auth/verifyEmail", { token, email });
      set({ user: response.data.user });
      return response.data;
    } catch (error) {
      console.error("Email verification failed:", error);
      set({ error: error.data.message || "Email verification failed" });
      throw error;
    }
  },

  resendVerification: async (email) => {
    try {
      const response = await api.post("/auth/resendVerification", { email });
      return response.data;
    } catch (error) {
      console.error("Resend verification failed:", error);
      set({ error: error.data.message || "Resend verification failed" });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
      set({ error: error.data.message || "Logout failed" });
      throw error;
    }
  },
}));
