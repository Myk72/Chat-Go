import { create } from "zustand";
import { api } from "@/lib/api";

export const useUserStore = create((set) => ({
  users: [],
  conversations: [],
  selectedUser: null,
  loading: false,
  error: null,
  onlineUserIds: [],
  setOnlineUserIds: (ids) => set({ onlineUserIds: ids }),

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

  editProfile: async (formData) => {
    set({ loading: false, error: null });
    try {
      const response = await api.put("/user/editProfile", { formData });
      const data = response.data;
      set({ loading: false, users: data.users });
      return data;
    } catch (error) {
      console.log("Error in editProfile:", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
