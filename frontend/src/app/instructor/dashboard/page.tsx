import CourseOverview from "@/components/instructor/dashboard/CourseOverview";
import OverallCourseRating from "@/components/instructor/dashboard/OverallCourseRating";
import StatusForInstructor from "@/components/instructor/dashboard/StatusForInstructor";

const page = () => {
  return (
    <>
      <StatusForInstructor />
      <div className="mt-5 flex gap-5">
        <OverallCourseRating />

        <CourseOverview />
      </div>
    </>
  );
};

export default page;
