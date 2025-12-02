"use client";
import { useState } from "react";
import ProfileImageInstructor from "@/components/shared/instructor-info/ProfileImageInstructor";
import PersonalInstructorInfo from "@/components/shared/instructor-info/PersonalInstructorInfo";
import { Box } from "@mui/material";
import PaginationComponent from "@/components/organisms/Pagination";
import CourseCard from "@/components/common/Card";

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

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8; 
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const startIndex = (currentPage - 1) * coursesPerPage;
  const visibleCourses = courses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <>
      <div className="flex justify-center gap-20 mt-10">
        <ProfileImageInstructor />
        <PersonalInstructorInfo />
      </div>

      <Box
        sx={{
          mt: 7,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
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

      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </>
  );
};

export default page;
