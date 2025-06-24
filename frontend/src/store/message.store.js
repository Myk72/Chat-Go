import { create } from "zustand";
import { api } from "@/lib/api";

const useMessageStore = create((set) => ({
  messages: [],

  fetchChat: async (receiverId) => {
    try {
      const res = await api.get(`/messages/${receiverId}`);
      set((state) => ({
        messages: res.data.messages,
      }));
      return res.data.messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
  sendMessage: async (receiverId, content) => {
    try {
      const res = await api.post(`/messages/${receiverId}`, { content });
      set((state) => ({
        messages: [...state.messages, res.data.message],
      }));
      return res.data.message;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
}));

export default useMessageStore;
