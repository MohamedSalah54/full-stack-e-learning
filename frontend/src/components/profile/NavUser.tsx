"use client";
import React, { useState } from "react";
import AccountSetting from "./AccountSetting";
import { navUser } from "@/constants";
import CourseCard from "@/components/common/Card";
import PaginationComponent from "@/components/organisms/Pagination";

export default function NavUser() {
  const [activeTab, setActiveTab] = useState("courses");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };

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

        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "messages" && <Messages />}
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
