"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FiBold, FiItalic, FiUnderline, FiPaperclip } from "react-icons/fi";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { CreateSection } from "@/types/section";

interface Props {
  onNext: (data: CreateSection[]) => void;
  defaultValues?: Partial<CreateSection>[];
}

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

export default function CreateSectionForm({ onNext, defaultValues }: Props) {
  const { register, handleSubmit, control } = useForm<{
    sections: CreateSection[];
  }>({
    defaultValues: {
      sections: defaultValues?.length
        ? defaultValues
        : [{ title: "", courseName: "", order: "", description: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "sections",
  });

  const [openSections, setOpenSections] = useState<boolean[]>(
    fields.map(() => true)
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const onSubmit: SubmitHandler<{ sections: CreateSection[] }> = (data) => {
    onNext(data.sections);
  };

  const selectLabels = ["Section Order", "Course Name"];
  const selectFields: (keyof CreateSection)[] = ["order", "courseName"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2
        className="text-[24px] font-semibold leading-none"
        style={{ fontFamily: "Nunito" }}
      >
        Create Sections
      </h2>

      {fields.map((field, index) => (
        <div key={field.id} className="pb-4">
          {/* Section Header (Bar) */}
          <div
            className="flex justify-between items-center cursor-pointer bg-gray-100 p-2 rounded-md mb-2"
            onClick={() => toggleSection(index)}
          >
            <span>Section {index + 1}</span>
            {openSections[index] ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>

          {openSections[index] && (
            <div className="space-y-4">
              {/* Title */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium">Title</label>
                <input
                  {...register(`sections.${index}.title` as const, {
                    required: "Title is required",
                  })}
                  className="w-full h-[45px] border border-[#00666133] rounded-md p-2"
                  placeholder="Enter title"
                />
              </div>

              {/* 2 Select Options Side by Side */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {selectFields.map((fieldName, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 relative w-full"
                  >
                    <label className="text-sm font-medium">
                      {selectLabels[idx]}
                    </label>
                    <select
                      {...register(`sections.${index}.${fieldName}` as const, {
                        required: "Select option",
                      })}
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

              {/* Description */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium">
                  Section Descriptions
                </label>
                <div className="relative w-full">
                  <textarea
                    {...register(`sections.${index}.description` as const, {
                      required: "Description is required",
                    })}
                    placeholder="Enter Descriptions"
                    className="w-full h-[250px] border border-[#E9EAF0] rounded-md p-2 resize-none"
                  />
                  <div className="absolute bottom-5 left-2 flex gap-4">
                    <FiBold className="cursor-pointer" />
                    <FiItalic className="cursor-pointer" />
                    <FiUnderline className="cursor-pointer" />
                    <FiPaperclip className="cursor-pointer" />
                  </div>
                  <hr className="absolute bottom-12 left-0 w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 cursor-pointer"
          onClick={() => {
            append({ title: "", courseName: "", order: "", description: "" });
            setOpenSections((prev) => [...prev, true]); // افتح السكشن الجديد تلقائي
          }}
        >
          Add Another Section
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
