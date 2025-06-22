import React from "react";
import { useAuthStore } from "@/store/auth.store";
import { Info } from "lucide-react";

const MyProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="font-serif space-y-2">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <div className="flex space-x-3 border-b">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-18 h-18 rounded-full mb-4"
          />
        ) : (
          <div className="w-18 h-18 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
            <span className="text-white text-xl">{user.firstName[0]}</span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          {user.is_online ? (
            <p className="text-green-500">Online</p>
          ) : (
            <p className="text-gray-500">Offline</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-8 mt-4 ml-2">
        <Info className="text-blue-500" size={32} />
        <div className="space-y-2">
          <div>
            <p className="text-lg">{user.email}</p>
            <p className="text-muted-foreground text-xs">Email</p>
          </div>
          {user.bio && (
            <div>
              <p className="text-lg">{user.bio}</p>
              <p className="text-muted-foreground text-xs">Bio</p>
            </div>
          )}
          {user.username && (
            <div>
              <p className="text-lg text-blue-500 cursor-pointer">
                @{user.username}
              </p>
              <p className="text-muted-foreground text-xs">Username</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
