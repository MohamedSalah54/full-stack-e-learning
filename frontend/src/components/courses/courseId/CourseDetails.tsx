"use client";
import React, { useState } from "react";

export interface CourseDetailsProps {
  title?: string;
  imageUrl?: string;
  description?: string;
}

export default function CourseDetails({
  title = "Untitled Course",
  imageUrl = "/course-info.png",
  description = `Lorem ipsum dolor sit amet consectetur. Ut volutpat fusce ultrices luctus mattis nisl. Enim pretium accumsan tellus a ut pellentesque arcu tortor eget. Consectetur gravida sem quam integer in ultrices pretium nisi.`,
}: CourseDetailsProps) {
  const [active, setActive] = useState<
    "overview" | "details" | "benefits" | "faq" | "testimonials"
  >("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "details", label: "Details" },
    { key: "benefits", label: "Benefits" },
    { key: "faq", label: "FAQ" },
    { key: "testimonials", label: "Testimonials" },
  ] as const;

  return (
    <div className="mx-4 md:mx-12">
      {/* Title */}
      <h1
        className="font-extrabold text-[40px] leading-none text-[#232323] font-nunito mt-5 mb-5"
        style={{ width: 640, height: 65, gap: 10, opacity: 1 }}
      >
        {title}
      </h1>

      {/* Image */}
      <div
        className="mt-4 overflow-hidden"
        style={{ width: 660, height: 430, borderRadius: 8, opacity: 1 }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
          style={{ borderRadius: 8 }}
        />
      </div>
      {/* Tabs bar */}
      <div
        className="mt-4 rounded-lg"
        style={{
          width: 660,
          height: 65,
          opacity: 1,
        }}
      >
        <nav
          className="bg-gray-800 rounded-lg h-full flex items-center justify-center"
          aria-label="Course sections"
        >
          <div className="flex items-center justify-center gap-8 w-full">
            {tabs.map((t) => {
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative text-[15px] font-nunito font-medium leading-[100%] transition-all outline-none focus:outline-none ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                  style={{ width: 87, height: 27 }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {t.label}

                  <span
                    aria-hidden
                    className={`absolute -bottom-3 h-1 rounded-sm transition-all duration-200 ${
                      isActive ? "w-full bg-white" : "w-0 bg-transparent"
                    }`}
                    style={{
                      height: 6,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Content container */}
      <div className="mt-6" style={{ width: 525, height: "auto", opacity: 1 }}>
        <div
          className="font-nunito text-[16px] leading-[100%] text-gray-800"
          style={{ width: 525, height: 75 }}
        >
          {active === "overview" && (
            <p className="text-gray-700">{description}</p>
          )}
          {active === "details" && (
            <p className="text-gray-700">
              This section contains details about the course — syllabus, what
              will be taught, prerequisites, and learning outcomes.
            </p>
          )}
          {active === "benefits" && (
            <p className="text-gray-700">
              Benefits: Gain practical experience, build real projects, get
              support and certificate.
            </p>
          )}
          {active === "faq" && (
            <p className="text-gray-700">
              FAQ: Common questions and answers about the course.
            </p>
          )}
          {active === "testimonials" && (
            <p className="text-gray-700">
              Testimonials: Student reviews and success stories.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/*
Usage example:

<CourseDetails
  title="React & Next.js Complete Course"
  imageUrl="/path/to/course-image.jpg"
  description="Short description or html content..."
/>

Notes:
- The component uses inline pixel sizes to match your spec (640px, 430px...). In responsive layouts you may want to replace fixed widths with responsive classes.
- The Nunito font should be loaded in your app (e.g. via Google Fonts or your global CSS) for perfect match.
*/
