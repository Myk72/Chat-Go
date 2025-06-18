import React, { useState } from "react";
import Navbar from "../bar/Navbar";
import {
  MessageCircleMoreIcon,
  Menu,
  User,
  Settings,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import MessageCard from "../card/MessageCard";
import useMessageStore from "@/store/message.store.js";
import { useNavigate } from "react-router-dom";

const ChatLayout = () => {
  const { selectedChat, messages } = useMessageStore();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const handleNewMessage = () => {
    useMessageStore.setState((state) => ({
      selectedChat:
        state.messages.find((c) => c.chatId === selectedChat.chatId) || null,
    }));
  };

  return (
    <div className="flex h-screen w-full relative">
      <div className="w-1/3 h-screen bg-white shadow-md z-10">
        <div className="flex items-center space-x-2 p-4 border-b">
          <Menu
            className="mr-4 cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
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

      {showMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-gray-50 h-full shadow-lg p-4 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 cursor-pointer border-b p-2 hover:bg-gray-100">
                  <User />
                  <span>My Profile</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer border-b p-2 hover:bg-gray-100">
                  <Settings />
                  <span>Settings</span>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 border-b"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon /> : <Sun />}
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </div>
              </div>
            </div>
            <div
              className="mt-auto cursor-pointer p-2 flex space-x-4 hover:bg-gray-100 border-t"
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
            >
              <LogOut />
              <span className="ml-2">Logout</span>
            </div>
          </div>

          <div className="flex-1" onClick={() => setShowMenu(false)} />
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
