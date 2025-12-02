import Image from "next/image";
import { Facebook, Twitter, X } from "lucide-react";
import React from "react";
import { aboutUs_feedback } from "@/assets";

export default function HeroSectionCards() {
  return (
    <section className="w-[1320px] h-[548px] flex flex-col gap-[40px] mx-auto ">
      {/* Top Section */}
      <div className="w-[768px] h-[160px] flex flex-col gap-5 mx-auto text-center">
        {/* Owner */}
        <div className="w-[768px] h-[80px] flex flex-col gap-3 items-center">
          <span className="text-[16px] font-semibold text-gray-800 leading-[24px]">
            Owner
          </span>

          <h2 className="text-[32px] font-semibold leading-[44px] tracking-[-2%] text-[#232323]">
            Meet the Heroes
          </h2>
        </div>

        {/* Description */}
        <p className="w-[768px] h-[60px] text-[20px] font-normal leading-[30px] text-[#424957] mx-auto">
          Lorem ipsum dolor sit amet consectetur. Quis lobortis quis aliquet a
          proin hendrerit placerat id. Augue ut amet felis aliquet.
        </p>
      </div>

      {/* Cards Container */}
      <div className="w-[1320px] h-[348px] flex gap-[40px]">
        {[1, 2, 3, 4].map((card) => (
          <div
            key={card}
            className="w-[300px] h-[348px] bg-[#E2E4E9] rounded-[16px] p-4 px-6 flex flex-col"
          >
            <div className="w-[259px] h-[316px] flex flex-col gap-6 items-center text-center">
              {/* Image */}
              <Image
                src={aboutUs_feedback}
                alt="hero"
                width={80}
                height={80}
                className="rounded-full"
              />

              {/* Text Section */}
              <div className="w-[259px] h-[132px] flex flex-col gap-2 items-center text-center">
                <h3 className="font-bold text-[20px] text-gray-900">
                  John Doe
                </h3>
                <span className="text-[16px] text-gray-700">
                  Full Stack Developer
                </span>

                <p className="text-[14px] text-gray-600 leading-[20px]">
                  Empowering future developers with real-world coding skills and
                  hands-on projects.
                </p>
              </div>

              {/* Icons */}
              <div className="w-[100px] h-[56px] flex gap-5 items-center p-4">
                <Twitter className="w-5 h-5 text-[#1877F2]" />
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
