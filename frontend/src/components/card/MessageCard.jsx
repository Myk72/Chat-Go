import { Paperclip, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ShowProfile from "../profile/ShowProfile";

const messages = [
  {
    id: 1,
    sender: "Sara Michael",
    text: "Hey, have you been keeping up with your finances lately?",
    time: "10:45 PM",
    type: "text",
  },
  {
    id: 2,
    sender: "Sara Michael",
    text: "I've been trying to stay on top of it. It's been a bit of a rollercoaster with unexpected expenses popping up.",
    time: "10:45 PM",
    type: "text",
  },
  {
    id: 3,
    sender: "You",
    text: "Hey there",
    time: "11:07 PM",
    type: "text",
  },
  {
    id: 4,
    sender: "You",
    text: "I know what you mean. I've been thinking about setting up a budget to help me manage better. Have you tried anything like that?",
    time: "11:07 PM",
    type: "text",
  },
  {
    id: 5,
    sender: "You",
    text: "That sounds useful. Maybe I'll give it a try",
    time: "11:07 PM",
    type: "text",
  },
  {
    id: 6,
    sender: "Sara Michael",
    text: "That sounds useful. Do you have any other tips for staying financially organized? I attached a file.",
    time: "11:07 PM",
    type: "text",
  },
  // {
  //   id: 7,
  //   sender: "You",
  //   text: "No problem!",
  //   time: "11:07 PM",
  //   type: "text",
  // },
];

const MessageCard = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center bg-blue-50 space-x-3 px-4 py-3 border cursor-pointer"
        onClick={() => setProfileOpen(true)}
      >
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Sara"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-800">Sara Michael</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                msg.sender === "You"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-blue-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-right mt-1 opacity-70">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 bg-white flex items-center gap-3 border-t border-l border-gray-100">
        <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <Paperclip className="w-5 h-5" />
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 focus:outline-none"
          />
        </div>
        <button className=" text-white rounded-lg flex items-center gap-2">
          <SendHorizontal className="size-5 text-blue-500" />
        </button>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <ShowProfile
            onSuccess={() => {
              setProfileOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageCard;
