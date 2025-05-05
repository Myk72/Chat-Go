import React from "react";

const ShowProfile = ({ onSuccess }) => {
  return (
    <div className="space-y-6 font-serif p-4">
      <div className="flex items-center space-x-4 border-b pb-4">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Sara"
          className="size-20 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-800 text-lg">Sara Michael</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-800">Info</h1>

        <div>
          <p className="text-gray-800">thomas@example.com</p>
          <p className="text-muted-foreground text-sm">Email</p>
        </div>

        <div>
          <p className="text-gray-800">God is greater</p>
          <p className="text-muted-foreground text-sm">Bio</p>
        </div>

        <div>
          <p className="text-gray-800">@thomas</p>
          <p className="text-muted-foreground text-sm">Username</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
