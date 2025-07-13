import React from "react";

const ChatCard = ({ receiver, isActive, onClick, lastMessage, isOnline }) => {
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
            {lastMessage.content}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">
          {new Date(lastMessage.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
