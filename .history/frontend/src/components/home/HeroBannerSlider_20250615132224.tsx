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
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <section className="w-full h-[400px] overflow-hidden relative bg-black">
      {/* Slides wrapper */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative"
            style={{ width: `${100 / slides.length}%` }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
            />

            {/* Text box inside image */}
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10">
              <div className="bg-white/90 p-5 rounded-md max-w-md">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {slide.title}
                </h1>
                <p className="text-gray-700 text-base">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {current > 0 && (
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
        >
          <FaArrowLeft />
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
        >
          <FaArrowRight />
        </button>
      )}
    </section>
  );
};

export default HeroBannerSlider;
