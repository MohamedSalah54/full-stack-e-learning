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

  return  (
   <section className="w-full h-[400px] bg-white flex items-center justify-center">
      {/* Wrapper that controls image size and centers content */}
      <div className="relative w-full max-w-[1000px] h-full overflow-hidden">
        {/* Images */}
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

        {/* Text Box */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-30">
          <div className="bg-white/90 p-5 rounded-md max-w-sm shadow-md">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {slides[current].title}
            </h1>
            <p className="text-gray-700 text-base">{slides[current].description}</p>
          </div>
        </div>

        {/* Arrows (inside image area) */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-40"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-40"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default HeroBannerSlider;
