import { profile_instructor } from "@/assets";
import AboutInstructor from "@/components/courses/courseId/AboutInstructor"
import CourseDetails from "@/components/courses/courseId/CourseDetails"

const page = () => {
  return (
    <div className="flex gap-2">
        <CourseDetails />
        <AboutInstructor
          instructorName="Dr. Kareem Elsharif"
          instructorImage={profile_instructor}
        />
    </div>
  );
};


export default page