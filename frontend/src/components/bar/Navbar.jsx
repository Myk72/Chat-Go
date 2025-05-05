import React from "react";
import ChatCard from "../card/ChatCard";

const Navbar = () => {
  const chats = [
    {
      id: 1,
      name: "Semalign M",
      message: "Hello There, I have seen Saron today and I'm so excited",
      time: "10:30pm",
      unreadCount: 2,
      online: true,
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Mikias B",
      message: "Yo, How are you doing?",
      time: "10:30pm",
      unreadCount: 0,
      online: false,
      selected: true,
      avatar: "https://i.pravatar.cc/40?img=3",
    },
  ];
  return (
    <div className="shadow-sm h-screen p-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded-md border-gray-300 "
      />
      <div className="flex flex-col gap-2 overflow-y-auto h-full">
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
