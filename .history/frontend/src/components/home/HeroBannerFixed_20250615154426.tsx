// components/HeroBannerFixed.tsx
'use client';

import { HiOutlineArrowSmRight } from "react-icons/hi";

const HeroBannerFixed = () => {
    return (
        <section className="w-full bg-white py-10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Text content on the left */}
                <div className="w-full md:w-1/2 text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        AI for Business Leaders
                    </h1>
                    <span className="block text-gray-700 text-base mb-6">
                        Build an AI-habit for you and your team that builds hands-on skills to help you lead effectively.

                    </span>
                    <button className="px-5 py-2 bg-white text-gray-800 border border-gray-800 rounded hover:bg-gray-200 transition flex items-center gap-2 cursor-pointer">
                        Start Learning <HiOutlineArrowSmRight />
                    </button>

                </div>

                {/* Image on the right */}
                <div className="w-full md:w-[500px] lg:w-[2100px]">
                    <img
                        src="/hero-fixed.png"
                        alt="Hero"
                        className="w-full h-auto rounded-md -md object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroBannerFixed;
