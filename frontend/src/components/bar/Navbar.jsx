import React, { useEffect, useState } from "react";
import ChatCard from "../card/ChatCard";
import useMessageStore from "@/store/message.store.js";
import { useUserStore } from "@/store/user.store";

const Navbar = () => {
  const { selectedChat, messages: chats, fetchChat } = useMessageStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { users, getUsers } = useUserStore();

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await getUsers(searchQuery);
          const data = res.data;
          setSearchResults(data.users || []);
        } catch (err) {
          console.error("Error searching users:", err);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleChatClick = (chat) => {
    const updatedChats = chats.map((c) =>
      c.chatId === chat.chatId ? { ...c, unreadCount: 0 } : c
    );
    useMessageStore.setState({
      messages: updatedChats,
      selectedChat: chat,
    });
  };

  return (
    <div className="shadow-sm p-2 h-screen flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-1 border rounded-md border-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto pb-10">
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="text-center text-gray-500 py-4">Searching...</div>
          ) : searchQuery.trim() !== "" ? (
            searchResults.length > 0 ? (
              searchResults.map((user) => (
                <ChatCard
                  key={user._id}
                  chat={{
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    username: user.username,
                    chatId: user._id,
                  }}
                  isActive={selectedChat?.chatId === user._id}
                  onClick={() =>
                    handleChatClick({
                      chatId: user._id,
                      name: `${user.firstName} ${user.lastName}`,
                      email: user.email,
                      username: user.username,
                    })
                  }
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No users found
              </div>
            )
          ) : (
            chats.map((chat) => (
              <ChatCard
                key={chat.chatId}
                chat={chat}
                isActive={selectedChat?.chatId === chat.chatId}
                onClick={() => handleChatClick(chat)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
