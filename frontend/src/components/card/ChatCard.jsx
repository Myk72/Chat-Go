import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import useMessageStore from "@/store/message.store";
import { useAuthStore } from "@/store/auth.store";
import { MdDone, MdDoneAll } from "react-icons/md";

const ChatCard = ({
  conversationId,
  receiver,
  isActive,
  onClick,
  lastMessage,
  isOnline,
}) => {
  const { fetchChat, messages } = useMessageStore();
  const { user } = useAuthStore();
  const [lastSentMessage, setLastSentMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (receiver) {
      fetchChat(receiver._id);
      socket.emit("join_conversation", String(conversationId));
    }
  }, [receiver]);

  useEffect(() => {
    const filteredMessage = messages.find(
      (msg) => msg.receiverId === receiver._id
    );
    if (!filteredMessage || !filteredMessage.messages) return;
    // console.log("Filtered Yoyo:", filteredMessage);
    const lastMsg =
      filteredMessage.messages[filteredMessage.messages.length - 1];
    setLastSentMessage(lastMsg);

    const unseenMessages = filteredMessage.messages.filter(
      (msg) => !msg.seenBy.includes(user._id)
    );

    setUnreadCount(unseenMessages ? unseenMessages.length : 0);
  }, [messages, receiver]);

  return (
    <div
      className={`flex items-center justify-between px-2 py-3 hover:bg-gray-100 rounded-lg cursor-pointer ${
        isActive ? "bg-blue-100 rounded-l-none border-l-4 border-blue-600" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          {receiver.profilePic ? (
            <img
              src={receiver.profilePic}
              alt={`${receiver.firstName} ${receiver.lastName}`}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {receiver.firstName.charAt(0).toUpperCase()}
                {receiver.lastName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-gray-900">
            {receiver.firstName} {receiver.lastName}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {lastSentMessage?.content ||
              lastMessage?.content ||
              "No messages yet"}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">
          {new Date(
            lastSentMessage?.timestamp || lastMessage.timestamp
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {unreadCount > 0 && (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}

        <span className="text-blue-600 text-lg flex justify-end">
          {lastSentMessage?.sender._id === user._id &&
            (lastSentMessage?.seenBy.includes(receiver._id) ? (
              <MdDoneAll className="w-5 h-5 text-blue-600" />
            ) : (
              <MdDone className="w-5 h-5 text-blue-600" />
            ))}
        </span>
      </div>
    </div>
  );
};

export default ChatCard;
