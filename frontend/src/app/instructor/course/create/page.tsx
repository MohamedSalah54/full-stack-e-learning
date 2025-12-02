"use client"
import BasicInfoForm from "@/components/instructor/course-new-edition/CreateCourse";
import CreateLessonForm from "@/components/instructor/course-new-edition/CreateLesson";
import CreateSection from "@/components/instructor/course-new-edition/CreateSection";
import { CreateCourse } from "@/types/course";

const page = () => {
    const handleNext = (data: CreateCourse) => {
    console.log("Form Data:", data);
  };
  return (
    <div>
      {/* <BasicInfoForm onNext={handleNext} /> */}
      {/* <CreateSection onNext={handleNext}/> */}
      <CreateLessonForm onNext={handleNext}/>
    </div>
  );
};

export default page;
