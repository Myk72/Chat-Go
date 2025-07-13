import { create } from "zustand";
import { api } from "@/lib/api";

const useMessageStore = create((set) => ({
  messages: [],

  fetchChat: async (receiverId) => {
    try {
      const res = await api.get(`/messages/${receiverId}`);
      const newMessages = res.data.messages;

      if (newMessages.length > 0) {
        const conversationId = newMessages[0].conversationId;

        set((state) => {
          const existingConversation = state.messages.find(
            (conversation) => conversation.conversationId === conversationId
          );

          if (!existingConversation) {
            return {
              messages: [
                {
                  conversationId,
                  receiverId,
                  messages: newMessages,
                },
                ...state.messages,
              ],
            };
          }

          return {
            messages: state.messages.map((conversation) =>
              conversation.conversationId === conversationId
                ? { ...conversation, messages: newMessages }
                : conversation
            ),
          };
        });
      }

      return newMessages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  addMessage: (message) => {
    set((state) => {
      const conversationId = message.conversationId;
      const existingConversation = state.messages.find(
        (conversation) => conversation.conversationId === conversationId
      );

      if (existingConversation) {
        return {
          messages: state.messages.map((conversation) =>
            conversation.conversationId === conversationId
              ? {
                  ...conversation,
                  messages: [...conversation.messages, message],
                }
              : conversation
          ),
        };
      }

      return {
        messages: [
          ...state.messages,
          {
            conversationId,
            receiverId: message.receiver._id,
            messages: [message],
          },
        ],
      };
    });
  },

  markMessageAsSeen: (messageIds, userId, conversationId) => {
    set((state) => {
      return {
        messages: state.messages.map((conversation) =>
          conversation.conversationId === conversationId
            ? {
                ...conversation,
                messages: conversation.messages.map((msg) =>
                  messageIds.includes(msg._id)
                    ? {
                        ...msg,
                        seenBy: msg.seenBy.includes(userId)
                          ? msg.seenBy
                          : [...msg.seenBy, userId],
                        status: "seen",
                      }
                    : msg
                ),
              }
            : conversation
        ),
      };
    });
  },
}));

export default useMessageStore;
