import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  selectedChat: null,

  fetchChat: async () => {
    try {
      setTimeout(() => {
        set({ messages: chats });
      }, 1000);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));

export default useMessageStore;
