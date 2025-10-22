"use client";

import React, { useEffect, useState } from "react";
import { useCourseStore } from "@/zustand/store/courseStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

const COURSES_PER_PAGE = 4;

const CourseList = () => {
    const [loading, setLoading] = useState(true);

  const router = useRouter()
  const { courses, error, getCourses } = useCourseStore();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    getCourses();
  }, []);

  const handleNext = () => {
    if (startIndex + COURSES_PER_PAGE < courses.length) {
      setStartIndex(startIndex + COURSES_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex - COURSES_PER_PAGE >= 0) {
      setStartIndex(startIndex - COURSES_PER_PAGE);
    }
  };

  // if (loading) return  <Loader loading={loading} />

  if (error) return <p>Error: {error}</p>;

  const visibleCourses = courses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );

  return (
    <div className="relative w-full my-10">
      {/* Arrows */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="absolute left-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <AiOutlineLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        disabled={startIndex + COURSES_PER_PAGE >= courses.length}
        className="absolute right-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <AiOutlineRight size={24} />
      </button>

      {/* Course Cards */}
      <div className="px-6 sm:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={startIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-x-4 gap-y-6"
          >
            {visibleCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white border rounded-xl shadow overflow-hidden max-w-[300px] "
              >
                <div className="relative w-full h-36">
                  {course.thumbnail?.secure_url ? (
                    <Image
                      src={course.thumbnail.secure_url}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="text-base font-semibold mb-1">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {course.description?.slice(0, 60)}...
                  </p>
                  <div className="text-xs text-gray-500 mb-1">
                    Level: {course.level} | Language: {course.language}
                  </div>
                  <div className="text-green-600 font-bold">
                    ${course.price}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition cursor-pointer"
          onClick={()=>router.push("/categories/allCourses")}
        >
          See more courses
        </button>
      </div>
    </div>
  );
};

export default CourseList;
