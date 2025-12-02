"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PersonalInstructorInfo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-[640px] rounded-2xl overflow-hidden p-6">
      {/* Instructor name */}
      <h1 className="w-[600px] font-nunito font-extrabold text-[48px] leading-[100%] text-black mb-6">
        Dr. Kareem Elsharif
      </h1>

      {/* Stats */}
      <div className="flex gap-6 w-full mb-6">
        <div className="flex flex-col items-start text-left space-y-3">
          <p className="font-nunito font-extrabold text-[24px] leading-[100%]">
            12,345
          </p>
          <p className="font-nunito font-normal text-[16px] leading-[100%]">
            Total learners
          </p>
        </div>
        <div className="flex flex-col items-start text-left space-y-3">
          <p className="font-nunito font-extrabold text-[24px] leading-[100%]">
            12,345
          </p>
          <p className="font-nunito font-normal text-[16px] leading-[100%]">
            Total learners
          </p>
        </div>
      </div>

      {/* About title */}
      <h2 className="w-[300px] font-nunito font-extrabold text-[48px] leading-[100%] text-black mb-3">
        about me
      </h2>

      {/* About content */}
      <div
        className={`w-full rounded-lg p-4 font-nunito text-[24px] leading-[140%] transition-all duration-300
    ${
      expanded ? "max-h-[320px] overflow-auto" : "max-h-[172px] overflow-hidden"
    }
  `}
      >
        <p className="whitespace-pre-line">
          Hi, I’m Dr. Kareem Elsharif, and I’m excited to be part of your
          learning journey! As an instructor, my mission is to make complex
          topics simple, practical, and enjoyable for everyone—regardless of
          their background or experience level. I specialize in [your
          field—e.g., UI/UX design, web development, or digital marketing], and
          I’ve spent the last few years not just learning and working in the
          field, but also helping others build confidence and real skills they
          can apply in the real world. My approach to teaching is hands-on,
          structured, and human-centered. I believe that learning should feel
          natural and rewarding, not overwhelming. That’s why I focus on
          breaking down every topic into clear steps, supported by real
          examples, visuals, and useful tools that make understanding easier and
          more engaging. What drives me the most is seeing students go from
          unsure to unstoppable—whether it's someone launching their first app,
          redesigning a website, or simply discovering a passion for something
          new. I also keep my content updated with the latest trends and
          techniques, so you’re always learning what matters most right now in
          the industry. Whether you're just starting out or looking to sharpen
          your skills, I’m here to guide you, support you, and share everything
          I know. Let’s build something great—together.
        </p>
      </div>

      {/* Show more / less button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 w-[151px] h-[56px] px-4 py-3 flex items-center justify-center gap-2 rounded-md bg-white text-black font-nunito font-bold"
      >
        {expanded ? "Show less" : "Show more"}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
}
