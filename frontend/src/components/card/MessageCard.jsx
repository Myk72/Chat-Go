import { EllipsisVertical, Paperclip, SearchIcon, SendHorizontal, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ShowProfile from "../profile/ShowProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMessageStore from "@/store/message.store.js";

const MessageCard = ({ chat, onNewMessage = () => {} }) => {
  const { messages } = chat;
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const messageInput = currentMessage.trim();
    if (messageInput) {
      const newMessage = {
        messageId: Date.now(),
        sender: "You",
        text: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };

      useMessageStore.setState((state) => ({
        messages: state.messages.map((c) =>
          c.chatId === chat.chatId
            ? { ...c, messages: [...c.messages, newMessage] }
            : c
        ),
      }));

      onNewMessage();
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center space-x-3 px-4 py-3 border cursor-pointer"
        onClick={() => setProfileOpen(true)}
      >
        <img
          src={chat.avatar}
          alt={chat.name}
          className="size-9 rounded-full"
        />
        <div>
          <p className="font-medium font-serif ">{chat.name}</p>
          <p className={`text-xs ${chat.online ? "text-green-400" : ""}`}>
            {chat.online ? "Online" : "Offline"}
          </p>
        </div>
        <div className="ml-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full flex items-center justify-center cursor-pointer p-1 hover:bg-gray-200">
                <EllipsisVertical className="w-6 h-6 border-none" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"mr-2"}>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Search");
                }}
              >
                <SearchIcon className="size-4 mr-2" />
                <span>Search</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Delete Chat");
                }}
              >
                <Trash2 className="size-4 text-red-500 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-2 bg-gray-100 flex flex-col"
        ref={messagesContainerRef}
      >
        <div className="mt-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.messageId}
              className={`flex flex-row gap-2 items-end ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "You" && (
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-8 h-8 rounded-full"
                />
              )}

              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                  msg.sender === "You"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-blue-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="text-xs text-right mt-1 opacity-70">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-white flex items-center gap-3 border-t border-l border-gray-100">
        <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <Paperclip className="w-5 h-5" />
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 focus:outline-none"
            name="message"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e);
              }
            }}
          />
        </div>
        <button
          className=" text-white rounded-lg flex items-center gap-2"
          onClick={handleSendMessage}
        >
          <SendHorizontal className="size-5 text-blue-500" />
        </button>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <ShowProfile chat={chat} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageCard;
