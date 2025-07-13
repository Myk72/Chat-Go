import {
  EllipsisVertical,
  Paperclip,
  SearchIcon,
  SendHorizontal,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import useMessageStore from "@/store/message.store.js";
import { useAuthStore } from "@/store/auth.store";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ShowProfile from "../profile/ShowProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { socket } from "@/lib/socket";
import { useUserStore } from "@/store/user.store";

const MessageCard = ({ receiver }) => {
  const { messages, markMessageAsSeen } = useMessageStore();
  const { user } = useAuthStore();
  const { onlineUserIds } = useUserStore();

  const [profileOpen, setProfileOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const filteredMessages = useMemo(
    () =>
      messages.find((msg) => msg.receiverId === receiver._id)?.messages || [],
    [messages, receiver]
  );

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!receiver || !filteredMessages) return;

    const conversationId = filteredMessages[0].conversationId;
    const unseenMessages = filteredMessages.filter(
      (msg) => !msg.seenBy.includes(user._id)
    );
    // console.log("Unseen messages:", unseenMessages);
    if (unseenMessages.length > 0) {
      socket.emit("mark_as_seen", {
        messageIds: unseenMessages.map((msg) => msg._id),
        userId: user._id,
        conversationId: String(conversationId),
      });
    }
  }, [messages, receiver]);

  useEffect(() => {
    const handleMessageSeen = (msg) => {
      // console.log("Here is mess.");
      const { messageIds, userId, conversationId } = msg;
      markMessageAsSeen(messageIds, userId, conversationId);
    };
    socket.on("message_seen", handleMessageSeen);
    return () => {
      socket.off("message_seen", handleMessageSeen);
    };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageInput = currentMessage.trim();
    if (!messageInput) return;

    try {
      socket.emit("send_message", {
        receiverId: receiver._id,
        content: messageInput,
        userId: user?._id,
      });

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
        <div
          className="sm:hidden"
          onClick={(e) => {
            e.stopPropagation();
            useUserStore.setState({
              selectedUser: null,
            });
          }}
        >
          <ArrowLeft className="size-8 p-1 rounded hover:bg-gray-100" />
        </div>
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
            className={`text-xs ${
              onlineUserIds.includes(receiver._id) ? "text-green-400" : ""
            }`}
          >
            {onlineUserIds.includes(receiver._id) ? "Online" : "Offline"}
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

      {filteredMessages.length === 0 ? (
        <div className="flex justify-center bg-gray-100 text-gray-400 text-sm h-full items-center">
          <span>No messages yet. Start the conversation!</span>
        </div>
      ) : (
        <div
          className="flex-1 overflow-y-auto px-4 py-2 bg-gray-100 flex flex-col"
          ref={messagesContainerRef}
        >
          <div className="mt-auto space-y-3">
            {filteredMessages.map((msg) => {
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
