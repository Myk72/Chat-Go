import { create } from "zustand";
import { api } from "@/lib/api";

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async (searchQuery) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/user?q=${encodeURIComponent(searchQuery)}`);
      const data = response.data;
      set({ users: data.users, loading: false });
      return data.users;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));


