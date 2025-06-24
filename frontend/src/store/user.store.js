import { create } from "zustand";
import { api } from "@/lib/api";

export const useUserStore = create((set) => ({
  users: [],
  conversations: [],
  selectedUser: null,
  loading: false,
  error: null,

  getUsers: async (searchQuery) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(
        `/user?q=${encodeURIComponent(searchQuery)}`
      );
      console.log(response, "response");
      const data = response.data;
      set({ users: data.users, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  uploadProfilePic: async (file) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.put("/user/uploadProfilePic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getUserConversation: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/user/conversation");
      set({ loading: false, conversations: response.data.conversations });
      return response.data.conversations;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
