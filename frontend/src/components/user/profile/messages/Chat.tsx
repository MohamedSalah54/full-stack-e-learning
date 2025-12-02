// components/Chat.tsx
"use client";
import { Paperclip, Search } from "lucide-react";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  bio: string;
  image: string;
  size?: "large" | "small";
}

interface ChatProps {
  size?: "large" | "small";
}

const Chat: React.FC<ChatProps> = ({ size = "large" }) => {
  const users: User[] = [
    {
      id: 1,
      name: "Mohamed Salah",
      bio: "Football Player",
      image: "/mohamed.jpg",
    },
    {
      id: 2,
      name: "Ali Ahmed",
      bio: "Developer",
      image: "/ali.jpg",
    },
    {
      id: 3,
      name: "Sara Ali",
      bio: "Designer",
      image: "/sara.jpg",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  const [messages, setMessages] = useState<
    Record<number, { text: string; sender: "me" | "other" }[]>
  >({
    1: [],
    2: [],
    3: [],
  });
  const [input, setInput] = useState("");

  // send a message
  const handleSend = () => {
    if (input.trim() && selectedUser) {
      const userId = selectedUser.id;
      const newMessage = { text: input.trim(), sender: "me" as const };

      setMessages((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), newMessage],
      }));
      setInput("");

      // auto reply
      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [userId]: [
            ...(prev[userId] || []),
            { text: "رد من الشخص الآخر", sender: "other" },
          ],
        }));
      }, 1000);
    }
  };

  // search
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`flex gap-4 p-4 ${
        size === "small" ? "w-[1230px] h-[350px]" : "w-[600px] h-[450px]"
      }`}
    >
      {/*left container*/}
      <div
        className="flex flex-col rounded-lg border border-gray-300 bg-[#F3F4F6]"
        style={{ width: 298, height: 700 }}
      >
        {/* search*/}
        <div
          className="flex items-center border border-gray-300 rounded-t-lg px-4 py-2"
          style={{ height: 48 }}
        >
          <Search className="mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <hr className="border-gray-300 my-2" />

        {/* list of users*/}
        <div
          className="flex flex-col gap-2 overflow-y-auto px-1"
          style={{ marginLeft: 4 }}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-start gap-3 border border-gray-300 rounded-lg cursor-pointer transition 
                ${
                  selectedUser?.id === user.id
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}
              style={{
                width: 280,
                minHeight: 70,
                padding: "8px 8px",
              }}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right container*/}
      <div
        className="flex flex-col border border-gray-300 rounded-lg bg-[#F3F4F6]"
        style={{ width: 977, height: 700 }}
      >
        {selectedUser ? (
          <>
            {/* header */}
            <div
              className="flex items-center gap-4 rounded-lg p-3 border-b border-gray-300"
              style={{ height: 85 }}
            >
              <div className="relative">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div>
                <p className="font-semibold">{selectedUser.name}</p>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>

            {/* message */}
            <div
              className="
                flex-1
                max-h-[100%] 
                overflow-y-auto 
                p-4 
                flex flex-col gap-2
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300
              "
            >
              {messages[selectedUser.id]?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[60%] p-2 rounded-lg break-words ${
                    msg.sender === "me"
                      ? "ml-auto bg-gray-800 text-white text-lg"
                      : "mr-auto bg-gray-200 text-black text-lg"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* btn submit*/}
            <div className="flex items-center gap-2 p-2 border-t border-gray-300">
              <input
                type="text"
                className="flex-1 border border-[#C5CAD3] rounded-lg p-2"
                placeholder={`Send message to ${selectedUser.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Paperclip className="bg-gray-200 p-2 rounded-lg" size={35} />
              <button
                onClick={handleSend}
                className="bg-gray-800 text-white p-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            اختر شخص لبدء المحادثة
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
