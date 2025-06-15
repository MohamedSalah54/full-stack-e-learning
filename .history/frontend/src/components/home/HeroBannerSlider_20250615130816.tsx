// components/hero/HeroBannerSlider.tsx
"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    image: "/banner1.jpg",
    title: "مرحبًا بك في موقعنا",
    description: "ابدأ رحلتك معنا اليوم. نحن نقدم أفضل الحلول لتطوير أعمالك.",
  },
  {
    image: "/banner2.jpg",
    title: "حلول رقمية متكاملة",
    description: "نساعدك في بناء مستقبل رقمي قوي واحترافي.",
  },
];

const HeroBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full h-[500px] relative overflow-hidden">
      {/* Image */}
      <img
        src={slides[current].image}
        alt="Hero"
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay with text */}
<div className="absolute inset-0 flex items-start justify-start p-10">
        <div className="bg-white bg-opacity-90 p-6 rounded-md max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {slides[current].title}
          </h1>
          <p className="text-gray-700 text-lg">{slides[current].description}</p>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow hover:bg-gray-200 z-10"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow hover:bg-gray-200 z-10"
      >
        <FaArrowRight />
      </button>
    </section>
  );
};

export default HeroBannerSlider;
