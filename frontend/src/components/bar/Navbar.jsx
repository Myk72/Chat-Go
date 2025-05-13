import React, { useEffect, useState } from "react";
import ChatCard from "../card/ChatCard";
import useMessageStore from "@/store/message.store.js";

const Navbar = () => {
  const { selectedChat, messages: chats, fetchChat } = useMessageStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  const handleChatClick = (chat) => {
    const updatedChats = chats.map((c) => {
      if (c.chatId === chat.chatId) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    });
    useMessageStore.setState({
      messages: updatedChats,
      selectedChat: chat,
    });
  };

  const filteredChats = chats.filter((chat) => {
    // console.log("chat", chat);
    const searchName = chat.name || "";
    const searchEmail = chat.email || "";
    const searchUsername = chat.username || "";
    const searchMessage = chat.messages
      ? chat.messages.map((message) => message.text).join(" ")
      : "";
    return (
      searchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="shadow-sm p-4 h-screen flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded-md border-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex-1 overflow-y-auto pb-10">
        <div className="flex flex-col gap-2">
          {filteredChats.map((chat) => (
            <ChatCard
              key={chat.chatId}
              chat={chat}
              isActive={selectedChat?.chatId === chat.chatId}
              onClick={() => handleChatClick(chat)}
            />
          ))}
          {filteredChats.length === 0 && (
            <div className="text-center text-gray-500 py-4">No chats found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
