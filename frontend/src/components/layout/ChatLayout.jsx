import React from "react";
import Navbar from "../bar/Navbar";
import Topbar from "../bar/Topbar";
import { MessageCircleMoreIcon } from "lucide-react";
import MessageCard from "../card/MessageCard";
import useMessageStore from "@/store/message.store.js";
const ChatLayout = () => {
  const { selectedChat } = useMessageStore();
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="w-1/3 h-screen">
        <div className="flex items-center space-x-2 p-4 ml-2">
          <MessageCircleMoreIcon className="size-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">ChatGo</h1>
        </div>
        <Navbar />
      </div>
      <div className="w-2/3 h-screen flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-hidden bg-gray-100">
          {selectedChat ? (
            <MessageCard chat={selectedChat} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
