import React from "react";

const ShowProfile = ({ receiver }) => {
  return (
    <div className="space-y-6 font-serif p-4">
      <div className="flex items-center space-x-4 border-b pb-4">
        {receiver.profilePic ? (
          <img
            src={receiver.profilePic}
            alt={receiver.username}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {receiver.firstName.charAt(0).toUpperCase()}
              {receiver.lastName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-800 text-lg">
            {receiver.firstName} {receiver.lastName}
          </p>
          <p
            className={`text-xs text-gray-500 ${
              receiver.is_online ? "text-green-400" : ""
            }`}
          >
            {receiver.is_online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-800">Info</h1>

        <div>
          <p className="text-gray-800">{receiver.email}</p>
          <p className="text-muted-foreground text-sm">Email</p>
        </div>

        <div>
          <p className="text-gray-800">{receiver.bio}</p>
          <p className="text-muted-foreground text-sm">Bio</p>
        </div>

        <div>
          <p className="text-gray-800">@{receiver.username}</p>
          <p className="text-muted-foreground text-sm">Username</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
