import React from "react";

const ShowProfile = ({ chat }) => {
  return (
    <div className="space-y-6 font-serif p-4">
      <div className="flex items-center space-x-4 border-b pb-4">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="size-20 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-800 text-lg">{chat.name}</p>
          <p
            className={`text-xs text-gray-500 ${
              chat.online ? "text-green-400" : ""
            }`}
          >
            {chat.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-800">Info</h1>

        <div>
          <p className="text-gray-800">{chat.email}</p>
          <p className="text-muted-foreground text-sm">Email</p>
        </div>

        <div>
          <p className="text-gray-800">{chat.bio}</p>
          <p className="text-muted-foreground text-sm">Bio</p>
        </div>

        <div>
          <p className="text-gray-800">@{chat.username}</p>
          <p className="text-muted-foreground text-sm">Username</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
