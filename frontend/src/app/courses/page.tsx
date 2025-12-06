"use client";
import CourseCard from "@/components/common/Card";
import CardHorizontal from "@/components/common/CardHorizontal"; // <<< ضيف دا
import FilterSidebar from "@/components/courses/filterBar/FilterSidebar";
import SearchBarWithView from "@/components/courses/searchBar/SearchBarWithView";
import PaginationComponent from "@/components/organisms/Pagination";
import { Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ViewType = "grid" | "list";

const page = () => {
  const baseCourse = {
    image: "/image.png",
    title: "React for Beginners",
    rating: 4.5,
    reviews: 120,
    category: "Web Development",
    instructor: "Mohamed Salah",
    description: "Learn React from scratch with practical examples.",
    sections: 12,
    students: 345,
    price: 49,
    originalPrice: 99,
    level: "Beginner",
    language: "English",
    isEnrolled: false,
  };

  const courses = Array.from({ length: 12 }, (_, i) => ({
    ...baseCourse,
    _id: (i + 1).toString(),
    title: `React for Beginners ${i + 1}`,
  }));

  const [view, setView] = useState<ViewType>("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const startIndex = (currentPage - 1) * coursesPerPage;
  const visibleCourses = courses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="flex">
        <div className="flex-1 p-6 ">
          <SearchBarWithView view={view} setView={setView} />

          {view === "grid" && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {visibleCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  courseId={course._id}
                  image={course.image}
                  title={course.title}
                  rating={course.rating}
                  reviews={course.reviews}
                  category={course.category}
                  instructor={course.instructor}
                  description={course.description}
                  sections={course.sections}
                  students={course.students}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  level={course.level}
                  language={course.language}
                  isEnrolled={course.isEnrolled}
                  onEnroll={() => console.log("Enroll clicked")}
                  handleToggleFavorite={() => console.log("Favorite toggled")}
                />
              ))}
            </Box>
          )}

          {/*  List → CardHorizontal */}
          {view === "list" && (
            <div className="flex flex-col gap-6 mt-16 ml-18">
              {visibleCourses.map((course) => (
                <CardHorizontal
                  courseId={course._id}
                  image={course.image}
                  title={course.title}
                  rating={course.rating}
                  reviews={course.reviews}
                  lessons={course.sections}
                  students={course.students}
                  price={course.price}
                  description="This is a short description of the course"
                  showBookNow={true}
                />
              ))}
            </div>
          )}

          <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </Box>
        </div>

        <FilterSidebar />
      </div>
    </div>
  );
};

export default page;
