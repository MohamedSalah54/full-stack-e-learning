"use client";

import { useForm } from "react-hook-form";
import { QuizFormValues } from "@/types/lesson"; 
import { useState } from "react";
import QuestionsForm from "./QuestionsForm";

export default function QuizForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormValues>();

  const [showQuestionsForm, setShowQuestionsForm] = useState(false);

  // دالة Next لتغيير المكون
  const handleNext = (data: QuizFormValues) => {
    console.log("Quiz Submitted:", data);
    setShowQuestionsForm(true);
  };

  return (
    <>
      {showQuestionsForm ? (
        <QuestionsForm />
      ) : (
        <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
          <h2 className="text-[24px] font-semibold">Create Quiz</h2>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Quiz Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full h-[45px] border border-gray-300 rounded-md p-2"
              placeholder="Enter quiz title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full h-[150px] border border-gray-300 rounded-md p-2 resize-none"
              placeholder="Describe the quiz..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
          </div>

          {/* Time Limit + Total Marks + Passing Score */}
          <div className="flex gap-4 w-full">
            {/* Time Limit */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Time Limit (minutes)</label>
              <input
                type="number"
                {...register("timeLimit", { required: "Time Limit is required", valueAsNumber: true })}
                className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                placeholder="Enter time limit"
              />
              {errors.timeLimit && (
                <p className="text-red-500 text-xs">{errors.timeLimit.message}</p>
              )}
            </div>

            {/* Total Marks */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Total Marks</label>
              <input
                type="number"
                {...register("totalMarks", { required: "Total Marks is required", valueAsNumber: true })}
                className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                placeholder="Enter total marks"
              />
              {errors.totalMarks && (
                <p className="text-red-500 text-xs">{errors.totalMarks.message}</p>
              )}
            </div>

            {/* Passing Score */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Passing Score</label>
              <input
                type="number"
                {...register("passingScore", { required: "Passing Score is required", valueAsNumber: true })}
                className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                placeholder="Enter passing score"
              />
              {errors.passingScore && (
                <p className="text-red-500 text-xs">{errors.passingScore.message}</p>
              )}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-3 rounded-md"
            >
              Next to Questions
            </button>
          </div>
        </form>
      )}
    </>
  );
}
