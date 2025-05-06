import React, { useEffect } from "react";
import ChatCard from "../card/ChatCard";
import useMessageStore from "@/store/message.store.js";

const Navbar = () => {
  const { selectedChat, messages: chats, fetchChat } = useMessageStore();

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  const handleChatClick = (chat) => {
    useMessageStore.setState({ selectedChat: chat });
  };

  return (
    <div className="shadow-sm p-4 h-screen flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded-md border-gray-300"
      />
      <div className="flex-1 overflow-y-auto pb-10">
        <div className="flex flex-col gap-2">
          {chats.map((chat) => (
            <ChatCard
              key={chat.chatId}
              chat={chat}
              isActive={selectedChat?.chatId === chat.chatId}
              onClick={() => handleChatClick(chat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
