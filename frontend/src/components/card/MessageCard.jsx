import {
  EllipsisVertical,
  Paperclip,
  SearchIcon,
  SendHorizontal,
  Trash2,
} from "lucide-react";
import useMessageStore from "@/store/message.store.js";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ShowProfile from "../profile/ShowProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MessageCard = ({ receiver }) => {
  const { messages, fetchChat, sendMessage } = useMessageStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (receiver) {
        try {
          const fetchedMessages = await fetchChat(receiver._id);
          if (fetchedMessages) {
            console.log("Fetched messages:", fetchedMessages);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [receiver]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageInput = currentMessage.trim();
    if (!messageInput) return;
    try {
      const resp = await sendMessage(receiver._id, messageInput);
      setCurrentMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center space-x-3 px-4 py-3 border cursor-pointer"
        onClick={() => setProfileOpen(true)}
      >
        {receiver.profilePic ? (
          <img
            src={receiver.profilePic}
            alt={receiver.username}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {receiver.firstName.charAt(0).toUpperCase()}
              {receiver.lastName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-medium font-serif ">
            {receiver.firstName} {receiver.lastName}
          </p>
          <p
            className={`text-xs ${receiver.is_online ? "text-green-400" : ""}`}
          >
            {receiver.is_online ? "Online" : "Offline"}
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

      {messages.length === 0 ? (
        <div className="flex justify-center bg-gray-100 text-gray-400 text-sm h-full items-center">
          <span>No messages yet. Start the conversation!</span>
        </div>
      ) : (
        <div
          className="flex-1 overflow-y-auto px-4 py-2 bg-gray-100 flex flex-col"
          ref={messagesContainerRef}
        >
          <div className="mt-auto space-y-3">
            {messages.map((msg) => {
              const isSender = msg.sender._id !== receiver._id;
              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xl px-4 py-2 rounded-lg text-sm shadow-md ${
                      isSender
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-blue-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div>{msg.content}</div>
                    <div className={`text-xs opacity-70 text-end`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-4 py-3 bg-white flex items-center gap-3 border-t border-l border-gray-100">
        <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <Paperclip className="w-5 h-5" />
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <div className="flex-1">
          <textarea
            placeholder="Write a message..."
            className="w-full resize-none overflow-auto focus:outline-none text-sm"
            value={currentMessage}
            rows={1}
            style={{
              maxHeight: "120px",
            }}
            onChange={(e) => {
              setCurrentMessage(e.target.value);

              const textarea = e.target;
              textarea.style.height = "auto";
              textarea.style.height = `${textarea.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
                e.target.style.height = "auto";
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
          <ShowProfile receiver={receiver} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageCard;
