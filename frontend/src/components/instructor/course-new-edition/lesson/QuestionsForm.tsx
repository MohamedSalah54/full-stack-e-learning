"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { QuestionsFormValues, QuestionType } from "@/types/lesson";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function QuestionsForm() {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<QuestionsFormValues>({
    defaultValues: { questions: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [openIndexes, setOpenIndexes] = useState<boolean[]>([]);

  const toggleOpen = (index: number) => {
    const newState = [...openIndexes];
    newState[index] = !newState[index];
    setOpenIndexes(newState);
  };

  const onSubmit = (data: QuestionsFormValues) => {
    console.log("Questions Submitted:", data);
  };

  const watchQuestions = watch("questions");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-[24px] font-semibold">Add Questions</h2>

      {fields.map((field, index) => {
        const type = watchQuestions?.[index]?.type;
        const isOpen = openIndexes[index] ?? true;

        return (
          <div key={field.id} className="border border-gray-300 rounded-md p-4 space-y-2">
            {/* Header مع سهم */}
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleOpen(index)}>
              <span className="font-bold text-lg">Question {index + 1}</span>
              {isOpen ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
            </div>

            {isOpen && (
              <div className="space-y-4 mt-2">
                {/* Question Text */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Question Text</label>
                  <input
                    {...register(`questions.${index}.questionText` as const, { required: "Question Text is required" })}
                    className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                    placeholder="Enter question text"
                  />
                  {errors.questions?.[index]?.questionText && (
                    <p className="text-red-500 text-xs">{errors.questions[index]?.questionText?.message}</p>
                  )}
                </div>

                {/* Question Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Question Type</label>
                  <select
                    {...register(`questions.${index}.type` as const, { required: "Type is required" })}
                    className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select type</option>
                    <option value="MCQ">MCQ</option>
                    <option value="TRUE_FALSE">TRUE/FALSE</option>
                    <option value="SHORT_ANSWER">Short Answer</option>
                  </select>
                  {errors.questions?.[index]?.type && (
                    <p className="text-red-500 text-xs">{errors.questions[index]?.type?.message}</p>
                  )}
                </div>

                {/* Options (if MCQ) */}
                {type === "MCQ" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Options (comma separated)</label>
                    <input
                      {...register(`questions.${index}.options` as const)}
                      className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                      placeholder="Option 1, Option 2, Option 3, Option 4"
                    />
                  </div>
                )}

                {/* Correct Answer */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Correct Answer</label>
                  {type === "TRUE_FALSE" ? (
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="True"
                          {...register(`questions.${index}.correctAnswer` as const, { required: "Correct Answer is required" })}
                          className="accent-green-500 w-5 h-5"
                        />
                        <span className="text-green-600 font-medium">True</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="False"
                          {...register(`questions.${index}.correctAnswer` as const, { required: "Correct Answer is required" })}
                          className="accent-red-500 w-5 h-5"
                        />
                        <span className="text-red-600 font-medium">False</span>
                      </label>
                    </div>
                  ) : (
                    <input
                      {...register(`questions.${index}.correctAnswer` as const, { required: "Correct Answer is required" })}
                      className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                      placeholder="Enter correct answer"
                    />
                  )}
                  {errors.questions?.[index]?.correctAnswer && (
                    <p className="text-red-500 text-xs">{errors.questions[index]?.correctAnswer?.message}</p>
                  )}
                </div>

                {/* Marks */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Marks</label>
                  <input
                    type="number"
                    {...register(`questions.${index}.marks` as const, { required: "Marks are required", valueAsNumber: true })}
                    className="w-full h-[45px] border border-gray-300 rounded-md p-2"
                    placeholder="Enter marks"
                  />
                  {errors.questions?.[index]?.marks && (
                    <p className="text-red-500 text-xs">{errors.questions[index]?.marks?.message}</p>
                  )}
                </div>

                {/* Remove Question Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Remove Question
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Another Question */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => {
            append({ questionText: "", type: QuestionType.MCQ , options: [], correctAnswer: "", marks: 0 });
            setOpenIndexes(prev => [...prev, true]);
          }}
          className="bg-gray-800 text-white px-6 py-3 rounded-md"
        >
          Add Question
        </button>
      </div>

      {/* Submit All Questions */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-md"
        >
          Submit All Questions
        </button>
      </div>
    </form>
  );
}
