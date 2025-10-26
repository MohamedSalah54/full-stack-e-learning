"use client"
import React, { useState } from "react";

export default function PersonalInfo() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");

  const [qualifications, setQualifications] = useState<string[]>([]);
  const [qualificationInput, setQualificationInput] = useState<string>("");

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleQualificationKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && qualificationInput.trim()) {
      e.preventDefault();
      setQualifications([...qualifications, qualificationInput.trim()]);
      setQualificationInput("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Bio */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Bio</label>
        <input
          type="text"
          placeholder="Enter your bio"
          className="w-full h-[45px] border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Skills</label>
        <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 w-full min-h-[45px]">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white px-3 py-1 rounded-md flex items-center gap-2"
            >
              {skill}
              <button
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
            onKeyDown={handleSkillKeyDown}
            className="flex-1 min-w-[100px] border-none focus:outline-none"
          />
        </div>
      </div>

      {/* Qualifications */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Qualifications
        </label>
        <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 w-full min-h-[45px]">
          {qualifications.map((qualification, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white px-3 py-1 rounded-md flex items-center gap-2"
            >
              {qualification}
              <button
                onClick={() => removeQualification(index)}
                className="text-sm text-gray-300 hover:text-red-400"
              >
                ✕
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Press Enter to add qualification"
            value={qualificationInput}
            onChange={(e) => setQualificationInput(e.target.value)}
            onKeyDown={handleQualificationKeyDown}
            className="flex-1 min-w-[100px] border-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
