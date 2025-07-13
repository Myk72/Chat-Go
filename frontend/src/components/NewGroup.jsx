import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";

const NewGroup = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { users, getUsers } = useUserStore();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") return;

      const fetchUsers = async () => {
        setLoading(true);
        try {
          await getUsers(searchQuery);
        } catch (err) {
          console.error("Error searching users:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="font-serif">
      {!showAdd ? (
        <div>
          <h1 className="font-semibold mb-6">New Group</h1>
          <div className="flex space-x-6 w-full mb-4">
            <div className="flex items-center">
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-full shrink-0">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    className="size-16 rounded-full object-cover"
                  />
                ) : (
                  <Camera className="size-16 p-4 text-white" />
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                  }}
                />
              </label>
            </div>
            <div className="w-full">
              <label className="block mb-1">Group Name</label>
              <input
                className="border-b focus:outline-none border-blue-600 w-full"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant={"ghost"}
              className={"border-none text-blue-600 cursor-pointer"}
              onClick={() => {
                if (name) setShowAdd(true);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-semibold mb-6">Add Members</h1>

          {members.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-2 px-2 py-1 bg-blue-100 rounded-full"
                >
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.firstName}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      {member.firstName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium">
                    {member.firstName}
                  </span>
                  <button
                    onClick={() =>
                      setMembers((prev) =>
                        prev.filter((m) => m._id !== member._id)
                      )
                    }
                    className="text-xs text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border rounded-md border-gray-300 mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex-1 overflow-y-auto pb-10">
            <div className="flex flex-col gap-2">
              {loading ? (
                <div className="text-center text-gray-500 py-4">
                  Searching...
                </div>
              ) : searchQuery.trim() !== "" ? (
                users.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      onClick={() => {
                        setMembers((prev) => {
                          const exists = prev.some(
                            (member) => member._id === user._id
                          );
                          if (!exists) {
                            return [...prev, user];
                          }
                          return prev;
                        });
                        setSearchQuery("");
                      }}
                    >
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white">
                            {user.firstName.charAt(0).toUpperCase()}
                            {user.lastName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-sm text-gray-500">
                          @{user.username || user.email}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No users found
                  </div>
                )
              ) : null}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant={"ghost"}
              className={`border-none text-blue-600 ${
                members.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => {}}
            >
              Create
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
