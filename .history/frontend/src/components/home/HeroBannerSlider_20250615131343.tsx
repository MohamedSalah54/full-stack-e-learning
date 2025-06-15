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
       <section className="w-full h-[380px] relative overflow-hidden bg-gray-100">
  <div className="w-full h-full max-w-7xl mx-auto relative">
    <img
      src={slides[current].image}
      alt="Hero"
  className="w-full h-full object-contain transition-all duration-700 rounded-lg"
    />

    {/* Text overlay */}
    <div className="absolute inset-0 flex items-start justify-start p-6">
      <div className="bg-white/80 p-4 rounded-md max-w-md">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {slides[current].title}
        </h1>
        <p className="text-gray-700 text-base">{slides[current].description}</p>
      </div>
    </div>

    {/* Arrows */}
    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-10"
    >
      <FaArrowLeft />
    </button>
    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-10"
    >
      <FaArrowRight />
    </button>
  </div>
</section>

    );
};

export default HeroBannerSlider;
