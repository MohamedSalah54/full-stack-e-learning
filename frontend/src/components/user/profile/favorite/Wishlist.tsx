"use client";

import CardHorizontal from "@/components/common/CardHorizontal";
import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { useWishlistStore } from "@/zustand/store/wishlist";
import { useAuthStore } from "@/zustand/store/authStore";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import EmptyWishlist from "@/components/common/wishlist/EmptyWishlist ";

export default function Wishlist() {
  const user = useAuthStore((state) => state.user);
  const { wishlist, fetchWishlist, removeCourseFromWishlist, loading } =
    useWishlistStore();

  useEffect(() => {
    if (user?.id) fetchWishlist(user.id);
  }, [user, fetchWishlist]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Loader loading={loading} />
      </div>
    );
  if (wishlist.length === 0) return <EmptyWishlist />;

  return (
    <section className="w-full flex flex-col items-center my-6 space-y-6">
      {wishlist.map((item) => {
        const course = item.courseId;
        const courseId = course._id;

        return (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-md overflow-hidden"
            style={{ width: 1320, height: 196 }}
          >
            <CardHorizontal
              image={course.thumbnail?.secure_url || "/image.png"}
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
                <button className="w-[154px] h-[55px] rounded-[8px] border border-gray-400 text-gray-800 font-medium hover:bg-gray-200 transition">
                  Buy Now
                </button>

                <button className="w-[154px] h-[55px] rounded-[8px] border border-gray-400 text-white bg-gray-600 font-medium hover:bg-gray-800 transition cursor-pointer">
                  Add to Cart
                </button>

                {/* Heart Button */}
                <button
                  onClick={() => {
                    if (user) {
                      removeCourseFromWishlist(user.id, courseId);
                      toast.success("Course removed from wishlist!");
                    } else {
                      toast.error("You must be logged in to remove a course.");
                    }
                  }}
                  className="p-3 rounded-full text-red-500 border border-red-500 hover:bg-red-100"
                >
                  <Heart size={24} fill="red" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
