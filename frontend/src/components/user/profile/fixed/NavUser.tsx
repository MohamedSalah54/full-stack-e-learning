"use client";
import React, { useEffect, useRef, useState } from "react";
import AccountSetting from "../profileSettings/AccountSetting";
import { navUser } from "@/constants";
import Wishlist from "../favorite/Wishlist";
import PurchaseHistory from "../purchase/PurchaseHistory";
import MyCourses from "../enrollment/MyCourses";
import Chat from "../messages/Chat";

export default function NavUser() {
  const [activeTab, setActiveTab] = useState("courses");

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };

  const chatRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    switch (activeTab) {
      case "messages":
        scrollToBottom(chatRef);
        break;

      case "courses":
        scrollToBottom(coursesRef);
        break;

      case "wishlist":
        scrollToBottom(wishlistRef);
        break;

      case "history":
        scrollToBottom(historyRef);
        break;

      case "settings":
        scrollToBottom(settingsRef);
        break;

      default:
        break;
    }
  }, [activeTab]);

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

      <div className="mt-6 w-full mb-10">
        {activeTab === "courses" && (
          <>
            <div className="px-8" ref={coursesRef}>
              <MyCourses />
            </div>
          </>
        )}

        {activeTab === "wishlist" && (
          <div className="flex flex-col gap-6" ref={wishlistRef}>
            <Wishlist />
          </div>
        )}
        {activeTab === "messages" && (
          <div
            className="h-screen flex items-center justify-center"
            ref={chatRef}
          >
            <Chat />
          </div>
        )}
        {activeTab === "history" && (
          <div ref={historyRef}>
            {" "}
            <PurchaseHistory />
          </div>
        )}
        {activeTab === "settings" && (
          <div className="mb-10" ref={settingsRef}>
            {" "}
            <AccountSetting />{" "}
          </div>
        )}
      </div>
    </div>
  );
}
