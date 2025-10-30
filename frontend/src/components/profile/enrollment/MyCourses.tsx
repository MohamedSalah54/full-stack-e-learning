"use client";
import CourseCard from "@/components/common/Card";
import { useEnrollmentStore } from "@/zustand/store/enrollment";
import PaginationComponent from "@/components/organisms/Pagination";
import Loader from "@/components/common/Loader";
import { usePagination } from "@/hooks/usePagination";
import { useUnenroll } from "@/hooks/useUnenroll";
import { NotebookPen } from "lucide-react";
import { useEffect } from "react";
import { useSectionStore } from "@/zustand/store/course/section/sectionStore";

const MyCourses = () => {
  const COURSES_PER_PAGE = 8;
  const { loading, error } = useEnrollmentStore();

  const { localEnrollments, handleUnenroll, hasCourses } =
    useUnenroll(COURSES_PER_PAGE);

  const { getCourseEnrollmentsCount, courseEnrollmentsCount } =
    useEnrollmentStore();

  useEffect(() => {
    if (localEnrollments.length > 0) {
      const firstCourseId = localEnrollments[0].courseId._id;
      getCourseEnrollmentsCount(firstCourseId);
    }
  }, [localEnrollments]);

  const { getSectionsByCourseId, sections } = useSectionStore();

  useEffect(() => {
    if (localEnrollments.length > 0) {
      const firstCourseId = localEnrollments[0].courseId._id;
      getSectionsByCourseId(firstCourseId);
    }
  }, [localEnrollments]);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    visibleItems: visibleCourses,
    handlePageChange,
  } = usePagination(localEnrollments, COURSES_PER_PAGE);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (loading) return <Loader loading={true} />;

  return (
    <>
      {hasCourses ? (
        <>
          {visibleCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleCourses.map((enroll) => {
                const course = enroll.courseId;
                return (
                  <CourseCard
                    key={course._id}
                    image={course.thumbnail?.secure_url || "/image.png"}
                    title={course.title}
                    rating={course.rating || 4.9}
                    category={course.category?.name || "Unknown"}
                    instructor={
                      course.instructor
                        ? `${
                            course.instructor.firstName
                              ?.charAt(0)
                              .toUpperCase() || ""
                          }${course.instructor.firstName?.slice(1) || ""} ${
                            course.instructor.lastName
                              ? course.instructor.lastName
                                  .charAt(0)
                                  .toUpperCase() +
                                course.instructor.lastName.slice(1)
                              : ""
                          }`
                        : "Unknown"
                    }
                    level={course.level}
                    language={course.language}
                    reviews={course.rating || 0}
                    description={course.description}
                    sections={sections.length || 0}
                    students={courseEnrollmentsCount || 0} // ✅ هنا بنمرر العدد
                    price={course.price}
                    originalPrice={course.originalPrice}
                    onEnroll={() =>
                      handleUnenroll(
                        course._id,
                        enroll._id,
                        currentPage,
                        setCurrentPage
                      )
                    }
                    isEnrolled={true}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No courses on this page.
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <NotebookPen className="w-20 h-20 mb-4 text-gray-400" />

          <p className="text-xl font-medium text-center">
            You have no enrollments yet.
          </p>
        </div>
      )}
    </>
  );
};

export default MyCourses;
