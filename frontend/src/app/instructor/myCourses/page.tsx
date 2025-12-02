"use client";
import { useState } from "react";
import CourseCard from "@/components/common/Card";
import FilterForInstructor from "@/components/instructor/myCourses/FilterForInstructor";
import { IconButton } from "@mui/material";
import { DeleteIcon, EditIcon } from "lucide-react";
import PaginationComponent from "@/components/organisms/Pagination";
import { useSidebar } from "@/context/sidebar-context";
import { CourseLevel } from "@/types/course";

interface PageProps {
  isSidebarOpen?: boolean;
}

const Page: React.FC<PageProps> = () => {
  const { isSidebarOpen } = useSidebar();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const cardsPerRow = isSidebarOpen ? 3 : 4;

  const allCourses = Array.from({ length: 12 }, (_, i) => ({
    courseId: `${i + 1}`,
    title: `React for Beginners ${i + 1}`,
    image: "/image.png",
    rating: 4.5,
    category: "Development",
    instructor: "Mohamed Salah",
    reviews: 20,
    description: "Learn React from scratch...",
    sections: 12,
    students: 200,
    price: 50,
    originalPrice: 100,
    level: "beginner" as CourseLevel,
    language: "English",
    isEnrolled: false,
  }));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = allCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);

  const handleEdit = (courseId: string) =>
    console.log("Edit course:", courseId);
  const handleDelete = (courseId: string) =>
    console.log("Delete course:", courseId);

  return (
    <div className="p-4">
      <FilterForInstructor />

      <div
        className="grid gap-6 mt-6"
        style={{
          gridTemplateColumns: `repeat(${cardsPerRow}, minmax(0, 1fr))`,
        }}
      >
        {paginatedCourses.map((course) => (
          <CourseCard
            key={course.courseId}
            courseId={course.courseId}
            userId="456"
            image={course.image}
            title={course.title}
            rating={course.rating}
            category={course.category}
            instructor={course.instructor}
            reviews={course.reviews}
            description={course.description}
            sections={course.sections}
            students={course.students}
            price={course.price}
            originalPrice={course.originalPrice}
            level={course.level}
            language={course.language}
            isEnrolled={course.isEnrolled}
            onEnroll={() => console.log("Enroll clicked", course.courseId)}
            customActions={
              <div className="flex gap-2">
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(course.courseId)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(course.courseId)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            }
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Page;
