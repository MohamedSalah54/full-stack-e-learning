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
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt="Hero"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>

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

        {/* Text Box - Positioned for large screens, stacked for small */}
        <div className="absolute bottom-0 left-0 w-full md:top-1/2 md:left-[170px] md:transform md:-translate-y-1/2 md:w-auto z-30">
          <div className="bg-white/90 p-5 m-4 rounded-md shadow-md max-w-xl mx-auto md:mx-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {slides[current].title}
            </h1>
            <p className="text-gray-700 text-sm md:text-base">{slides[current].description}</p>
          </div>
        </div>
      </section>

      {/* Text Section Below the Slider */}
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
