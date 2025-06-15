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
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextSlide = () => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full h-[400px] overflow-hidden relative bg-black">
      <div className="relative w-full h-full">
        <div
          className={`flex w-full h-full transition-transform duration-1000 ease-in-out`}
          style={{
            transform: `translateX(-${current * 100}%)`,
            flexDirection: direction === "right" ? "row" : "row-reverse",
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain"
              />

              {/* Text */}
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
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-20"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default HeroBannerSlider;
