import React from "react";
import { useAuthStore } from "@/store/auth.store";
import { LockKeyhole, UserCircle2, Mail, NotepadTextIcon, AtSign } from "lucide-react";

const Settings = () => {
  const { user } = useAuthStore();

  return (
    <div className="font-serif space-y-2">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
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
          <p className="font-medium text-sm">{user.email}</p>
          {user.bio && <p className="text-gray-600">{user.bio}</p>}
        </div>
      </div>

      <div className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer">
        <div className="flex space-x-3">
          <UserCircle2 />
          <p>Name</p>
        </div>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>

      <div className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer">
        <div className="flex space-x-3">
          <NotepadTextIcon />
          <p>Bio</p>
        </div>
        <span>
          {user.bio ? user.bio : "Set Your Biography"}
        </span>
      </div>

      <div className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer">
        <div className="flex space-x-3">
          <Mail />
          <p>Email</p>
        </div>
        <span>{user.email}</span>
      </div>
      <div className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer">
        <div className="flex space-x-3">
          <AtSign />
          <p>Username</p>
        </div>
        <span>{user.username ? user.username : "Add your username"}</span>
      </div>

      <div className="flex space-x-3 hover:bg-gray-100 p-2 rounded-2xl cursor-pointer">
        <LockKeyhole />
        <p>Change Password</p>
      </div>
    </div>
  );
};

export default Settings;
