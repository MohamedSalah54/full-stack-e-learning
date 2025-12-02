"use client";

import { AssignmentFormValues } from "@/types/lesson";
import { useForm } from "react-hook-form";

export default function AssignmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentFormValues>();

  const onSubmit = (data: AssignmentFormValues) => {
    console.log("Assignment Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-[24px] font-semibold">Create Assignment</h2>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Assignment Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          placeholder="Enter assignment title"
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
          placeholder="Describe the assignment..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>
      <div className="flex gap-4 w-full">
        {/* Deadline */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium">Deadline</label>
          <input
            type="date"
            {...register("deadline", { required: "Deadline is required" })}
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs">{errors.deadline.message}</p>
          )}
        </div>

        {/* Max Marks */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium">Max Marks</label>
          <input
            type="number"
            {...register("maxMarks", {
              required: "Max Marks is required",
              valueAsNumber: true,
            })}
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
            placeholder="Enter maximum marks"
          />
          {errors.maxMarks && (
            <p className="text-red-500 text-xs">{errors.maxMarks.message}</p>
          )}
        </div>
      </div>

      {/* File Upload Allowed */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("fileUploadAllowed")} />
        <label className="text-sm font-medium">Allow File Upload</label>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-3 rounded-md"
        >
          Submit Assignment
        </button>
      </div>
    </form>
  );
}
