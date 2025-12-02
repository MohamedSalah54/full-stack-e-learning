"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import  { CreateCourse } from "@/types/course"; 
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiPaperclip,
  FiUpload,
} from "react-icons/fi";
import { ArrowRight, ChevronDown } from "lucide-react";

interface Props {
  onNext: (data: CreateCourse) => void;
  defaultValues?: Partial<CreateCourse>;
}

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

export default function CreateCourseForm({ onNext, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourse>({
    defaultValues: {
      title: "",
      description: "",
      courseLevel: "",
      courseCategory: "",
      courseLanguage: "",
      coursePrice: "",
      courseThumbnail: "",
      ...defaultValues,
    },
  });

  const onSubmit: SubmitHandler<CreateCourse> = (data) => {
    onNext(data);
  };

  const selectLabels = [
    "Course Level",
    "Course Category",
    "Course Language",
    "Course Price",
  ];
  const selectFields: (keyof CreateCourse)[] = [
    "courseLevel",
    "courseCategory",
    "courseLanguage",
    "coursePrice",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <h2
        className="text-[24px] font-semibold leading-none"
        style={{ fontFamily: "Nunito" }}
      >
        Create Course
      </h2>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full h-[45px] border border-[#00666133] rounded-md p-2"
          placeholder="Enter title"
        />
      </div>

      {/* 4 Select Options */}
      <div className="grid grid-cols-4 gap-4">
        {selectFields.map((field, idx) => (
          <div key={idx} className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium">{selectLabels[idx]}</label>

            <select
              {...register(field, { required: "Select option" })}
              className="w-full h-[45px] border border-[#00666133] rounded-md p-2 pr-10 appearance-none"
            >
              <option value="">Select</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown size={20} className="mt-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Text Area for Course Description */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium">Course Descriptions</label>

        <div className="relative w-full">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter Descriptions"
            className="w-full h-[250px] border border-[#E9EAF0] rounded-md p-2 resize-none"
          />
          {/* Toolbar داخل الـ textarea في الأسفل */}
          <div className="absolute bottom-5 left-2 flex gap-4">
            <FiBold className="cursor-pointer" />
            <FiItalic className="cursor-pointer" />
            <FiUnderline className="cursor-pointer" />
            <FiPaperclip className="cursor-pointer" />
          </div>
          <hr className="absolute bottom-12 left-0 w-full border-t border-gray-300" />
        </div>
      </div>

      {/* Thumbnail Upload + Submit Button */}
      <div className="flex items-center gap-6">
        {/* Thumbnail Container */}
        <div
          className="flex items-center gap-12  rounded-md p-4"
          style={{ width: 1000, height: 160 }}
        >
          <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
            <span>Image</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p>
              Upload your course Thumbnail here. Important guideline: 1200x800
              pixels or 12:8 Ratio Supported format: .jpg, .jpeg, or .png
            </p>
            <button
              type="button"
              className="flex items-center justify-between bg-gray-800 text-white rounded-md"
              style={{
                width: 205,
                height: 45,
                padding: "10px 26px",
              }}
            >
              <span>Upload Thumbnail</span>
              <FiUpload />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        {/* Submit Button */}
        <div className="mt-4 flex w-full mt-20">
          <button
            type="submit"
            className="ml-auto bg-gray-800 text-white flex items-center justify-center gap-4 font-semibold text-lg"
            style={{
              width: 200,
              height: 45,
              borderRadius: 8,
              padding: "10px 32px",
            }}
          >
            Next
            <ArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
}
