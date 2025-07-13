import React, { useEffect, useState } from "react";
import ChatCard from "../card/ChatCard";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { users, onlineUserIds,  getUsers, selectedUser, getUserConversation, conversations } =
  useUserStore();
  const { user } = useAuthStore();

  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    getUserConversation();
  }, []);

  useEffect(() => {
    if (!conversations) return;

    const filtered = conversations.map((conversation) => {
      const friend = conversation.members.find(
        (member) => member._id !== user?._id
      );
      return {
        chatId: conversation._id,
        receiver: friend,
        lastMessage: conversation.lastMessage,
      };
    });
    console.log("Filtered Chats:", filtered);
    setFilteredChats(filtered);
  }, [conversations, selectedUser]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        return;
      }

      const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await getUsers(searchQuery);
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

  const handleChatClick = (friends) => {
    useUserStore.setState({
      selectedUser: friends.receiver,
    });
  };

  return (
    <div className="shadow-sm p-2 h-full sm:h-screen flex flex-col gap-4 md:max-w-sm lg:max-w-xl xl:max-w-full bg-white">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 border rounded-md border-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto pb-10">
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="text-center text-gray-500 py-4">Searching...</div>
          ) : searchQuery.trim() !== "" ? (
            users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => {
                    useUserStore.setState({ selectedUser: user });
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
          ) : (
            filteredChats.map((friends) => (
              <ChatCard
                key={friends?.chatId}
                receiver={friends?.receiver}
                lastMessage={friends?.lastMessage}
                isActive={friends?.receiver?._id === selectedUser?._id}
                isOnline = {onlineUserIds.includes(friends?.receiver?._id)}
                onClick={() => handleChatClick(friends)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
