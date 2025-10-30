"use client";

import { useEffect, useState } from "react";
import { useCourseStore } from "@/zustand/store/courseStore";

import { useAuthStore } from "@/zustand/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { course_instructor, course_student } from "@/assets";
import Loader from "@/components/common/Loader";
import CourseCard from "@/components/common/Card";
import { useEnrollmentStore } from "@/zustand/store/enrollment";
import { toast } from "react-toastify";

export default function AllCoursesPage() {
  const { createEnrollment, removeEnrollment, enrollments,getUserEnrollments } = useEnrollmentStore();

  const [loading, setLoading] = useState(true);
  const COURSES_PER_PAGE = 8;

  const { courses, error, getCourses } = useCourseStore();
  const [startIndex, setStartIndex] = useState(0);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const bannerImage =
    user?.role === "student" ? course_student : course_instructor;

  const title =
    user?.role === "student"
      ? "📚 Student Dashboard – Access Your Learning Journey"
      : "👨‍🏫 Instructor Dashboard – Manage and Grow Your Courses";

  const description =
    user?.role === "student"
      ? "Access a curated catalog of professional courses designed to enhance your skills and support your career growth."
      : "Create, organize, and monitor your courses with advanced tools designed to help you reach and engage learners effectively.";

        useEffect(() => {
    if (user?.id) {
      getUserEnrollments(user.id);
    }
  }, [user?.id]); 


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCourses();
      setLoading(false);
    };
    fetchData();
  }, [getCourses]);

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

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const visibleCourses = courses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Loader loading={loading} />
      </div>

      {!loading && (
        <>
          <div className="min-h-screen bg-gray-50 py-12 px-12">
            {/* العنوان */}
            <div className="w-full bg-white py-6 px-12 mb-12">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
                {/* صورة البانر */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                  <Image
                    src={bannerImage}
                    alt="Banner"
                    className="w-full max-w-md h-auto object-contain"
                  />
                </div>

                {/* العنوان والكلام */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-4">{title}</h1>
                  <p className="text-gray-600 text-lg max-w-xl">
                    {description}
                  </p>
                  <button
                    className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition cursor-pointer mt-5"
                    onClick={() => router.push("/instructor/courses/new")}
                  >
                    Create your course
                  </button>
                </div>
              </div>
            </div>

            {/* الكروت */}
            {visibleCourses.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {visibleCourses.map((course) => (
                  <CourseCard
          key={course._id}
          image={course.thumbnail?.secure_url || "/image.png"}
          title={course.title}
          rating={course.rating || 4.9}
          category={course.category.name}
          instructor={
            course.instructor
              ? `${course.instructor.firstName?.[0]?.toUpperCase() || ""}${course.instructor.firstName?.slice(1) || ""} ${
                  course.instructor.lastName
                    ? course.instructor.lastName[0]?.toUpperCase() + course.instructor.lastName.slice(1)
                    : ""
                }`
              : ""
          }
          level={course.level}
          language={course.language}
          reviews={course.rating || 0}
          description={course.description}
          lessons={course.lessonsCount || 0}
          students={course.studentsCount || 0}
          price={course.price}
          originalPrice={course.originalPrice}
          onEnroll={async () => {
            if (!user?.id) return toast("Please log in first");

            try {
              const existing = enrollments.find((e) => e.courseId._id === course._id);

              if (existing) {
                await removeEnrollment(existing._id);
                await getUserEnrollments(user.id);
                toast.success("Unenrolled successfully!");
              } else {
                await createEnrollment(user.id, course._id);
                await getUserEnrollments(user.id);
                toast.success("Enrolled successfully!");
              }
            } catch (error: any) {
              toast.error(error.response?.data?.message || "Enrollment action failed");
            }
          }}
          isEnrolled={enrollments.some((e) => e.courseId._id === course._id)}
        />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No courses available yet.
              </p>
            )}

            {/* أزرار التحكم */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition cursor-pointer disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex + COURSES_PER_PAGE >= courses.length}
                className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition cursor-pointer disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
