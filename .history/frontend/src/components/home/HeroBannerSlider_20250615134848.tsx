"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { heroSlides } from "@/constants";

const slides = heroSlides

const HeroBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
 <section className="w-full h-[400px] relative overflow-hidden bg-white">
  {/* Image with transition */}
  <div className="w-full h-full relative">
    {slides.map((slide, index) => (
      <img
        key={index}
        src={slide.image}
        alt="Hero"
        className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ${
          index === current ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />
    ))}
  </div>

  {/* Text box inside image */}
  <div className="absolute top-1/2 left-[170px] transform -translate-y-1/2 z-30">
    <div className="bg-white/90 p-5 rounded-md max-w-sm shadow-md">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {slides[current].title}
      </h1>
      <p className="text-gray-700 text-base">{slides[current].description}</p>
    </div>
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
</section>

{/* New text below the image section */}
<div className="w-full text-center py-10 bg-white">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">مرحبًا بك في موقعنا</h1>
  <p className="text-lg text-gray-700 max-w-xl mx-auto">
    نحن نقدم أفضل المنتجات والخدمات التي تناسب احتياجاتك. استكشف المزيد الآن.
  </p>
</div>

  );
};

export default HeroBannerSlider;
