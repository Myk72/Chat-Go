import React, { useState } from "react";
import Navbar from "../components/bar/Navbar";
import { useEffect } from "react";
import {
  MessageCircleMoreIcon,
  Menu,
  User,
  Moon,
  SettingsIcon,
  Sun,
  LogOut,
  Users,
} from "lucide-react";
import Settings from "./Settings";
import MessageCard from "../components/card/MessageCard";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MyProfile from "@/components/Profile";

const ChatPage = () => {
  const { selectedUser } = useUserStore();
  const [showMenu, setShowMenu] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [myProfileOpen, setMyProfileOpen] = useState(false);
  const [logoutVerify, setLogoutVerify] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  // useEffect(() => {}, [selectedUser]);

  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      <div className={`w-full sm:w-1/3 h-screen bg-white shadow-md z-10 ${selectedUser ? "hidden sm:block" : "block"}`}>
        <div className="flex items-center space-x-2 p-4 border-b">
          <Menu
            className="mr-4 cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
          <MessageCircleMoreIcon className="size-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">ChatGo</h1>
        </div>
        <Navbar />
      </div>

      <div className="w-2/3 flex-1 overflow-hidden h-screen">
        {selectedUser ? (
          <MessageCard receiver={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-gray-50 h-full shadow-lg p-4 flex flex-col justify-between">
            <div className="space-y-2">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-2"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-500 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-white text-3xl">
                    {user.firstName.charAt(0).toUpperCase() +
                      user.lastName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <h2 className="text-lg font-semibold py-2">
                {user.firstName} {user.lastName}
              </h2>
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-2 cursor-pointer border-b py-2 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                    setMyProfileOpen(true);
                  }}
                >
                  <User />
                  <span>My Profile</span>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer border-b py-2 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                    setMyProfileOpen(true);
                  }}
                >
                  <Users />
                  <span>New Group</span>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer border-b py-2 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                    setSettingOpen(true);
                  }}
                >
                  <SettingsIcon />
                  <span>Settings</span>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer py-2 hover:bg-gray-100 border-b"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon /> : <Sun />}
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </div>
              </div>
            </div>
            <div
              className="mt-auto cursor-pointer py-2 flex space-x-4 hover:bg-gray-100 border-t"
              onClick={async () => {
                setShowMenu(false);
                setLogoutVerify(true);
              }}
            >
              <LogOut />
              <span className="ml-2">Logout</span>
            </div>
          </div>

          <div className="flex-1" onClick={() => setShowMenu(false)} />
        </div>
      )}
      <Dialog open={settingOpen} onOpenChange={setSettingOpen}>
        <DialogContent className={"sm:max-w-md"}>
          <Settings />
        </DialogContent>
      </Dialog>
      <Dialog open={myProfileOpen} onOpenChange={setMyProfileOpen}>
        <DialogContent className={"sm:max-w-md"}>
          <MyProfile />
        </DialogContent>
      </Dialog>
      <Dialog
        open={logoutVerify}
        onOpenChange={setLogoutVerify}
        className="sm:max-w-md"
      >
        <DialogContent className="p-6">
          <h2 className="text-lg font-semibold">Confirm Logout</h2>
          <p className="text-gray-600">Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              onClick={() => setLogoutVerify(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
              onClick={async () => {
                setLogoutVerify(false);
                await logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatPage;
