"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { heroSlides } from "@/constants";

const slides = heroSlides;

const HeroBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* Slider Section */}
      <section className="w-full relative bg-white overflow-hidden">
        {/* Wrapper for center and padding on large screens */}
        <div className="w-full max-w-screen-xl mx-auto relative h-[250px] sm:h-[400px] md:h-[500px]">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt="Hero"
              className={`absolute top-0 left-0 w-full h-full object-cover object-[60%] transition-opacity duration-700 ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-40"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-40"
          >
            <FaArrowRight />
          </button>

          {/* Text Box for Large Screens */}
          <div className="hidden md:block absolute top-1/2 left-[170px] transform -translate-y-1/2 z-30">
            <div className="bg-white/90 p-5 rounded-md max-w-sm shadow-md">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {slides[current].title}
              </h1>
              <p className="text-gray-700 text-base">{slides[current].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Text Below Image for Small Screens */}
      <div className="block md:hidden w-full bg-white pt-6 px-4">
        <div className="bg-white p-0 shadow-none rounded-none">
          <h1 className="text-xl font-bold text-gray-900 mb-2">{slides[current].title}</h1>
          <p className="text-gray-700 text-sm">{slides[current].description}</p>
        </div>
      </div>

      {/* Section Below */}
      <div className="w-full text-left py-10 bg-white px-4 sm:px-10 md:px-32">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Ready to reimagine your career?
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-xl">
          Get the skills and real-world experience employers want with Career Accelerators.
        </p>
      </div>
    </>
  );
};

export default HeroBannerSlider;
