// components/HeroBannerFixed.tsx
'use client';

import React from 'react';

const HeroBannerFixed = () => {
  return (
 <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/banner.jpg" // غير المسار حسب الصورة بتاعتك
        alt="Hero Banner"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      {/* Overlay Text Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="bg-white/80 p-4 sm:p-6 rounded-md max-w-md shadow">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Transform Your Career Today
          </h1>
          <span className="block text-gray-700 text-sm sm:text-base mb-4">
            Learn from top mentors and build real-world skills.
          </span>
          <button className="px-5 py-2 bg-white text-gray-800 border border-gray-800 rounded hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerFixed;
