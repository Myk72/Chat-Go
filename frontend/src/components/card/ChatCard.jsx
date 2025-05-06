import React from "react";

const ChatCard = ({ chat, isActive, onClick }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer ${
        isActive ? "bg-blue-100 rounded-l-none border-l-4 border-blue-600" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              chat.online ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{chat.name}</p>
          <p className="text-sm text-gray-500 truncate w-72">
            {lastMessage.text}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">{lastMessage.time}</p>
        {chat.unreadCount > 0 && (
          <span className="bg-blue-500 text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full mb-1">
            {chat.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
