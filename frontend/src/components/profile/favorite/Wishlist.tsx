"use client";

import { BookOpen, Heart, Star, Users } from "lucide-react";
import React, { JSX, useState } from "react";

export default function Wishlist(): JSX.Element {
  const [inWishlist, setInWishlist] = useState(true);

  const toggleWishlist = () => setInWishlist(!inWishlist);
  return (
    <section className="w-full flex justify-center my-6">
      {/* main container */}
      <div
        className="flex items-center justify-between rounded-md overflow-hidden"
        style={{
          width: 1320,
          height: 196,
        }}
      >
        {/* Left area  */}
        <div
          className="flex items-center"
          style={{
            width: 793,
            height: 196,
            gap: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="flex-shrink-0 overflow-hidden border"
            style={{
              width: 292,
              height: 195,
              borderRadius: 8,
              opacity: 1,
              marginLeft: 0,
            }}
          >
            <img
              src="/image.png"
              alt="item"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* details center */}
          <div className="flex flex-col justify-center gap-3 ml-4">
            {/* Box 1: Rating */}
            <div
              className="flex flex-col justify-start gap-2"
              style={{ width: 453, height: 66, opacity: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < 4 ? "#FACC15" : "transparent"}
                      stroke="#FACC15"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm font-medium">4.8</p>
                <p className="text-gray-500 text-sm">(210)</p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Next.js Mastery Course
              </h3>
            </div>

            {/* Box 2: Lessons & Students */}
            <div
              className="flex items-center gap-5 text-sm text-gray-600"
              style={{ width: 236, height: 24, opacity: 1 }}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>40 Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>500 Students</span>
              </div>
            </div>

            {/* Box 3: Price */}
            <div
              className="flex items-center text-lg font-semibold text-gray-800"
              style={{ width: 453, height: 30, opacity: 1 }}
            >
              <span className="text-[#006661]">$59</span>
            </div>
          </div>
        </div>

        {/* Right action area */}
        <div
          className="flex items-center justify-end pr-6"
          style={{ width: 408, height: 196 }}
        >
          <div className="flex items-center justify-end gap-4">
            {/* Buy Now Button */}
            <button className="w-[154px] h-[55px] rounded-[8px] border border-gray-400 text-gray-800 font-medium hover:bg-gray-200 transition">
              Buy Now
            </button>

            {/* Add to Cart Button */}
            <button className="w-[154px] h-[55px] rounded-[8px] border border-gray-400 text-white bg-gray-600 font-medium hover:bg-gray-800 text-white transition cursor-pointer">
              Add to Cart
            </button>
            {/* Heart Button */}
            <button
              onClick={toggleWishlist}
              className={`p-3 rounded-full ${
                {
                  true: "text-red-500 border-red-500 hover:bg-red-100",
                  false: "text-gray-400 border-gray-400 hover:bg-gray-100",
                }[String(inWishlist)]
              }`}
            >
              <Heart
                size={24}
                fill={inWishlist ? "red" : "transparent"}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
