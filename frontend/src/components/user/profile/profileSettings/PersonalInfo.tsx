"use client"
import React, { useState } from "react";
import { Controller } from "react-hook-form";

export default function PersonalInfo({ control, register }: any) {

  return (
     <div className="flex flex-col gap-6 w-full">
      {/* Bio */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Bio</label>
        <input
          type="text"
          placeholder="Enter your bio"
          {...register("bio")}
          className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Skills</label>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => {
            const [skillInput, setSkillInput] = React.useState("");
            const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && skillInput.trim()) {
                e.preventDefault();
                field.onChange([...field.value, skillInput.trim()]);
                setSkillInput("");
              }
            };

            const removeSkill = (index: number) => {
              field.onChange(field.value.filter((_: any, i: number) => i !== index));
            };

            return (
              <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 w-full min-h-[45px]">
                {field.value?.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-white px-3 py-1 rounded-md flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-sm text-gray-300 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Press Enter to add skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="flex-1 min-w-[100px] border-none focus:outline-none"
                />
              </div>
            );
          }}
        />
      </div>

      {/* Qualifications */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Qualifications</label>
        <Controller
          name="qualifications"
          control={control}
          render={({ field }) => {
            const [input, setInput] = React.useState("");
            const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                field.onChange([...field.value, input.trim()]);
                setInput("");
              }
            };

            const remove = (index: number) => {
              field.onChange(field.value.filter((_: any, i: number) => i !== index));
            };

            return (
              <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 w-full min-h-[45px]">
                {field.value?.map((q: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-white px-3 py-1 rounded-md flex items-center gap-2"
                  >
                    {q}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-gray-300 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Press Enter to add qualification"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleAdd}
                  className="flex-1 min-w-[100px] border-none focus:outline-none"
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
