"use client";

import CardHorizontal from "@/components/common/CardHorizontal";
import { courses } from "@/constants";
import {  Heart  } from "lucide-react";
import React, { JSX, useState } from "react";

export default function Wishlist(): JSX.Element {
  const [inWishlist, setInWishlist] = useState(true);

  const toggleWishlist = () => setInWishlist(!inWishlist);
  return (
    <section className="w-full flex flex-col items-center my-6 space-y-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex items-center justify-between rounded-md overflow-hidden"
          style={{
            width: 1320,
            height: 196,
          }}
        >
          <CardHorizontal
            image={course.image}
            title={course.title}
            rating={course.rating}
            reviews={course.reviews}
            lessons={course.lessons}
            students={course.students}
            price={course.price}
          />

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
              <button className="w-[154px] h-[55px] rounded-[8px] border border-gray-400 text-white bg-gray-600 font-medium hover:bg-gray-800 transition cursor-pointer">
                Add to Cart
              </button>

              {/* Heart Button */}
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-full ${
                  inWishlist
                    ? "text-red-500 border border-red-500 hover:bg-red-100"
                    : "text-gray-400 border border-gray-400 hover:bg-gray-100"
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
      ))}
    </section>
  );
}
