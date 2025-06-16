"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    image: "/banner1.jpg",
    title: "Skills that drive you forward",
    description: "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",


  },
  {
    image: "/banner2.jpg",
    title: "Learning that gets you",
    description: "Skills for your present (and your future). Get started with us.",
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

      {/* Text box inside image, before arrow */}
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
  );
};

export default HeroBannerSlider;
