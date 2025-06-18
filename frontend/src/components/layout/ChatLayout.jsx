import React from "react";
import Navbar from "../bar/Navbar";
import Topbar from "../bar/Topbar";
import { MessageCircleMoreIcon } from "lucide-react";
import MessageCard from "../card/MessageCard";
import useMessageStore from "@/store/message.store.js";
const ChatLayout = () => {
  const { selectedChat, messages } = useMessageStore();
  const handleNewMessage = () => {
    useMessageStore.setState((state) => ({
      selectedChat:
        state.messages.find((c) => c.chatId === selectedChat.chatId) || null,
    }));
  };
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="w-1/3 h-screen">
        <div className="flex items-center space-x-2 p-2">
          <MessageCircleMoreIcon className="size-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">ChatGo</h1>
        </div>
        <Navbar />
      </div>
      <div className="w-2/3 flex-1 overflow-hidden h-screen">
        {selectedChat ? (
          <MessageCard chat={selectedChat} onNewMessage={handleNewMessage} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
