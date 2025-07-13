import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";
import {
  LockKeyhole,
  UserCircle2,
  Mail,
  NotepadTextIcon,
  AtSign,
  Edit,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { user } = useAuthStore();
  const { uploadProfilePic, editProfile, onlineUserIds } = useUserStore();
  const isOnline = onlineUserIds.includes(user._id);
  const [image, setImage] = useState(null);

  const [openField, setOpenField] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio || "",
    email: user.email,
    username: user.username || "",
    oldPassword: "",
    newPassword: "",
  });

  const handleSave = async () => {
    console.log("Updated data:", formData);
    try {
      await editProfile(formData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setOpenField(null);
  };

  return (
    <div className="font-serif space-y-2">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <div className="flex flex-col items-center border-b pb-2 relative">
        <div>
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-1"
            />
          ) : image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-1"
            />
          ) : (
            <div className="w-20 h-20 bg-blue-500 rounded-full mb-1 flex items-center justify-center">
              <span className="text-white text-3xl">
                {user.firstName.charAt(0).toUpperCase() +
                  user.lastName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute top-13 right-40 hover:bg-gray-200 bg-gray-50 p-1 rounded-full">
            <label className="cursor-pointer">
              <Edit size={18} />
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  console.log("Selected file:", file);
                  if (file) {
                    try {
                      setImage(file);
                      const response = await uploadProfilePic(file);
                      console.log("Profile picture updated:", response);
                    } catch (error) {
                      console.error("Error updating profile picture:", error);
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>

        <h2 className="font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        {isOnline ? (
          <p className="text-green-500 text-sm">Online</p>
        ) : (
          <p className="text-gray-500 text-sm">Offline</p>
        )}
      </div>

      <div
        className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer"
        onClick={() => setOpenField("name")}
      >
        <div className="flex space-x-3">
          <UserCircle2 />
          <p>Name</p>
        </div>
        <span className="text-blue-600">
          {formData.firstName} {formData.lastName}
        </span>
      </div>

      <div
        className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer"
        onClick={() => setOpenField("bio")}
      >
        <div className="flex space-x-3">
          <NotepadTextIcon />
          <p>Bio</p>
        </div>
        <span className="text-blue-600">
          {formData.bio || "Set Your Biography"}
        </span>
      </div>

      <div
        className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer"
        onClick={() => setOpenField("email")}
      >
        <div className="flex space-x-3">
          <Mail />
          <p>Email</p>
        </div>
        <span className="text-blue-600">{formData.email}</span>
      </div>

      <div
        className="flex justify-between hover:bg-gray-100 p-2 rounded-2xl cursor-pointer"
        onClick={() => setOpenField("username")}
      >
        <div className="flex space-x-3">
          <AtSign />
          <p>Username</p>
        </div>
        <span className="text-blue-600">
          {formData.username || "Add your username"}
        </span>
      </div>

      <div
        className="flex space-x-3 hover:bg-gray-100 p-2 rounded-2xl cursor-pointer"
        onClick={() => setOpenField("password")}
      >
        <LockKeyhole />
        <p>Change Password</p>
      </div>

      <Dialog open={openField} onOpenChange={() => setOpenField(null)}>
        <DialogContent className={"sm:max-w-sm top-40"}>
          <DialogHeader>
            <DialogTitle className={"font-serif"}>
              Edit {openField?.charAt(0).toUpperCase() + openField?.slice(1)}
            </DialogTitle>
          </DialogHeader>

          {openField === "name" && (
            <div className="grid grid-cols-1 gap-4">
              <input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="border-b p-2 focus:outline-none border-blue-600"
              />
              <input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="border-b p-2 focus:outline-none border-blue-600"
              />
            </div>
          )}
          {openField === "bio" && (
            <input
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="border-b p-2 focus:outline-none border-blue-600"
            />
          )}
          {openField === "email" && (
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border-b p-2 focus:outline-none border-blue-600"
            />
          )}
          {openField === "username" && (
            <input
              placeholder="@username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="border-b p-2 focus:outline-none border-blue-600"
            />
          )}
          {openField === "password" && (
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Old Password"
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
                required
                minLength={6}
                className="border-b p-2 focus:outline-none border-blue-600 w-full"
              />

              <input
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                required
                minLength={6}
                className="border-b p-2 focus:outline-none border-blue-600 w-full"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              className={"cursor-pointer"}
              variant="outline"
              onClick={() => setOpenField(null)}
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              className={"bg-blue-600 hover:bg-blue-700 cursor-pointer"}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
