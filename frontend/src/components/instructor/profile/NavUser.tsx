"use client";
import React, { useState } from "react";
import AccountSetting from "./AccountSetting";
import { navUser } from "@/constants";

export default function NavUser() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center border border-gray-300 rounded-lg bg-gray-800"
        style={{
          width: "1175px",
          height: "65px",
          borderRadius: "8px",
          justifyContent: "space-between",
          padding: "16px 41px",
        }}
      >
        {navUser.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-base font-medium transition-all ${
              activeTab === tab.id
                ? "text-white border-b-2 border-white pb-1"
                : "text-white opacity-70 hover:opacity-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 w-full">
        {activeTab === "courses" && <MyCourses />}
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "history" && <PurchaseHistory />}
        {activeTab === "settings" && <div className="mb-10"> <AccountSetting /> </div>}
      </div>
    </div>
  );
}

const MyCourses = () => (
  <div className="text-gray-700 text-center">📘 My Courses Component</div>
);
const Wishlist = () => (
  <div className="text-gray-700 text-center">💖 Wishlist Component</div>
);
const Messages = () => (
  <div className="text-gray-700 text-center">💬 Messages Component</div>
);
const PurchaseHistory = () => (
  <div className="text-gray-700 text-center">🧾 Purchase History Component</div>
);
const Settings = () => (
  <div className="text-gray-700 text-center">⚙️ Settings Component</div>
);
