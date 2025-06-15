// components/HeroBannerFixed.tsx
'use client';

import React from 'react';

const HeroBannerFixed = () => {
  return (
<section className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero-fixed.png" // غيّر المسار حسب صورتك
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-20">
        <div className="text-white max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-800">Achieve More with cademyX</h1>
          <span className="block text-lg md:text-xl mb-6 text-gray-800">Empower your future with quality learning</span>
          <button className="px-6 py-2 border border-gray-800 text-gray-800 bg-white rounded-md hover:bg-gray-100 transition">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerFixed;
