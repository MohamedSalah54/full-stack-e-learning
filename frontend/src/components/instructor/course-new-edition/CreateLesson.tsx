"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LessonType, CreateLesson } from "@/types/lesson";
import { ArrowRight, ChevronDown } from "lucide-react";
import AssignmentForm from "../course-new-edition/lesson/AssignmentForm";
import QuizForm from "../course-new-edition/lesson/QuizForm";

interface Props {
  onNext: (data: CreateLesson) => void;
}

export default function CreateLessonForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateLesson>({
    defaultValues: {
      sectionId: "",
      title: "",
      type: LessonType.VIDEO,
      videoUrl: "",
      content: "",
      duration: 0,
      order: 1,
    },
  });

  const selectedType = watch("type");

  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);

  const handleNext = () => {
    if (selectedType === LessonType.ASSIGNMENT) {
      setShowAssignmentForm(true);
    } else if (selectedType === LessonType.QUIZ) {
      setShowQuizForm(true);
    }
  };

  const sections = [
    { id: "1", name: "Section 1" },
    { id: "2", name: "Section 2" },
    { id: "3", name: "Section 3" },
  ];

  return (
  <>
    {showAssignmentForm ? (
      <AssignmentForm />
    ) : showQuizForm ? (
      <QuizForm/>
    ) : (
        <form className="space-y-6">
          <h2 className="text-[24px] font-semibold">Create Lesson</h2>

          {/* Title + Section Name */}
          <div className="flex gap-4 w-full">
            {/* Title */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                placeholder="Enter lesson title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Section Name */}
            <div className="flex-1 flex flex-col gap-2 relative">
              <label className="text-sm font-medium">Section Name</label>
              <select
                {...register("sectionId", {
                  required: "Section Name is required",
                })}
                className="w-full h-[45px] border border-gray-300 rounded-md p-2 appearance-none"
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-10" />
              {errors.sectionId && (
                <p className="text-red-500 text-xs">
                  {errors.sectionId.message}
                </p>
              )}
            </div>
          </div>

          {/* Lesson Type */}
          {selectedType === LessonType.VIDEO ? (
            <div className="flex gap-4 w-full">
              {/* Type */}
              <div className="flex-1 flex flex-col gap-2 relative">
                <label className="text-sm font-medium">Lesson Type</label>
                <select
                  {...register("type", { required: "Lesson type is required" })}
                  className="w-full h-[45px] border border-gray-300 rounded-md p-2 appearance-none"
                >
                  <option value={LessonType.VIDEO}>Video</option>
                  <option value={LessonType.ARTICLE}>Article</option>
                  <option value={LessonType.QUIZ}>Quiz</option>
                  <option value={LessonType.ASSIGNMENT}>Assignment</option>
                </select>
                <ChevronDown className="absolute right-3 top-10" />
                {errors.type && (
                  <p className="text-red-500 text-xs">{errors.type.message}</p>
                )}
              </div>

              {/* Video URL */}
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium">Video URL</label>
                <input
                  {...register("videoUrl", { required: "Video URL required" })}
                  className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                  placeholder="Enter Video URL"
                />
                {errors.videoUrl && (
                  <p className="text-red-500 text-xs">
                    {errors.videoUrl.message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-4 w-full">
              {/* Lesson Type */}
              <div className="flex-1 flex flex-col gap-2 relative">
                <label className="text-sm font-medium">Lesson Type</label>
                <select
                  {...register("type", { required: "Lesson type is required" })}
                  className="w-full h-[45px] border border-gray-300 rounded-md p-2 appearance-none"
                >
                  <option value="">Select type</option>
                  <option value={LessonType.ARTICLE}>Article</option>
                  <option value={LessonType.QUIZ}>Quiz</option>
                  <option value={LessonType.ASSIGNMENT}>Assignment</option>
                </select>
                <ChevronDown className="absolute right-3 top-10" />
                {errors.type && (
                  <p className="text-red-500 text-xs">{errors.type.message}</p>
                )}
              </div>

              {/* Order (Article / Quiz / Assignment) */}
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium">Lesson Order</label>
                <input
                  type="number"
                  {...register("order", { required: "Order is required" })}
                  className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                  placeholder="e.g. 1"
                />
                {errors.order && (
                  <p className="text-red-500 text-xs">{errors.order.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Article Content */}
          {selectedType === LessonType.ARTICLE && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <label className="text-sm font-medium">Article Content</label>
              <textarea
                {...register("content", { required: "Content required" })}
                className="w-full h-[200px] border border-gray-300 rounded-md p-2 resize-none"
                placeholder="Write lesson content..."
              />
              {errors.content && (
                <p className="text-red-500 text-xs">{errors.content.message}</p>
              )}
            </div>
          )}

          {/* Video Duration + Order */}
          {selectedType === LessonType.VIDEO && (
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  {...register("duration", { required: "Duration required" })}
                  className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                  placeholder="Enter duration"
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium">Lesson Order</label>
                <input
                  type="number"
                  {...register("order", { required: "Order is required" })}
                  className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                  placeholder="e.g. 1"
                />
                {errors.order && (
                  <p className="text-red-500 text-xs">{errors.order.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Submit / Next */}
          <div className="flex justify-end">
            <button
              type={
                selectedType === LessonType.VIDEO ||
                selectedType === LessonType.ARTICLE
                  ? "submit"
                  : "button"
              }
              onClick={
                selectedType === LessonType.ASSIGNMENT ||
                selectedType === LessonType.QUIZ
                  ? handleNext
                  : undefined
              }
              className="bg-gray-800 text-white flex items-center justify-center gap-4 px-6 py-3 rounded-md"
            >
              {selectedType === LessonType.VIDEO ||
              selectedType === LessonType.ARTICLE
                ? "Submit"
                : "Next"}{" "}
              <ArrowRight />
            </button>
          </div>
        </form>
      )}
    </>
  );
}
