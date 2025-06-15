// components/hero/HeroBannerSlider.tsx
"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "/banner1.jpg",
  "/banner2.jpg",
];

const HeroBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Text Box */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/3 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مرحبًا بك في موقعنا</h1>
          <p className="text-gray-700 text-lg">ابدأ رحلتك معنا اليوم. نحن نقدم أفضل الحلول لتطوير أعمالك على الإنترنت.</p>
        </div>

        {/* Slider */}
        <div className="relative w-full lg:w-2/3 overflow-hidden rounded-lg">
          <img
            src={images[current]}
            alt="Hero"
            className="w-full h-[400px] object-cover transition-all duration-500 rounded-lg"
          />

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerSlider;
