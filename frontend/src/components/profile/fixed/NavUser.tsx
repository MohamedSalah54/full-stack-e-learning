"use client";
import React, { useEffect, useRef, useState } from "react";
import AccountSetting from "../profileSettings/AccountSetting";
import { navUser } from "@/constants";
import CourseCard from "@/components/common/Card";
import PaginationComponent from "@/components/organisms/Pagination";
import Chat from "@/components/profile/chat/Chat";
import Wishlist from "../favorite/Wishlist";

export default function NavUser() {
  const [activeTab, setActiveTab] = useState("courses");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "messages" && chatRef.current) {
      setTimeout(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
            <div className="grid grid-cols-4 gap-6 px-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <CourseCard
                  key={index}
                  image="/image.png"
                  title={`Next.js Mastery ${index + 1}`}
                  rating={4.9}
                  reviews={210}
                  description="Learn how to build responsive, visually appealing websites from scratch using HTML5 and CSS3. This course covers layout techniques, animations, and best design practices."
                  lessons={40}
                  students={500}
                  price={59}
                  originalPrice={60}
                  onBook={() =>
                    alert(`You booked Next.js Mastery ${index + 1}!`)
                  }
                />
              ))}
            </div>
            {/*  mx- auto for pagination */}
            <div className="flex justify-center mt-8">
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}

        {activeTab === "wishlist" && (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Wishlist key={index} />
            ))}
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
        {activeTab === "history" && <PurchaseHistory />}
        {activeTab === "settings" && (
          <div className="mb-10">
            {" "}
            <AccountSetting />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

const PurchaseHistory = () => (
  <div className="text-gray-700 text-center">🧾 Purchase History Component</div>
);
