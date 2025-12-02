import { aboutUs_img } from "@/assets";
import { MonitorPlay, School, Wifi } from "lucide-react";
import Image from "next/image";

export default function HeroSectionCircle() {
  return (
    <section className="relative w-[1338px] h-[552px] flex items-center px-6 gap-[300px]">
      {/* Left Section */}
      <div className="w-[525px] h-[218px] flex flex-col gap-16 ml-16">
        <h2 className="w-[320px] h-[87px] font-extrabold text-[64px] leading-none text-[#232323] font-nunito">
          About Us
        </h2>
        <p className="w-[525px] h-[99px] text-[24px] leading-none font-normal text-[#2C313A] font-nunito mb-10">
          We’re passionate educators and creators dedicated to making
          high-quality learning accessible to everyone, everywhere.
        </p>
      </div>

      {/* Right Circle Section */}
      <div className="relative w-[400px] h-[400px]">
        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center relative">
          {/* Center Image */}
          <Image
            src={aboutUs_img}
            alt="about"
            width={300}
            height={300}
            className="rounded-full object-cover mt-15"
          />
        </div>

        {/* Top Right Square */}
        <div className="absolute -top-6 -right-20 w-[200px] h-[90px] bg-gray-200 rounded-xl shadow flex items-center p-3 gap-4">
          {/* Icon Circle */}
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <Wifi color="white" />
          </div>

          {/* Text */}
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-gray-900">5K+</span>
            <span className="text-sm text-gray-700">Online Courses</span>
          </div>
        </div>

        {/* Top Left Square */}
        <div className="absolute -top-6 -left-20 w-[200px] h-[90px] bg-gray-200 rounded-xl shadow flex items-center p-3 gap-4">
          {/* Icon Circle */}
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <MonitorPlay color="white" />
          </div>

          {/* Text */}
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-gray-900">2K+</span>
            <span className="text-sm text-gray-700">Video Courses</span>
          </div>
        </div>

        {/* Bottom Right Square */}
        <div className="absolute -bottom-6 -right-20 w-[200px] h-[90px] bg-gray-200 rounded-xl shadow flex items-center p-3 gap-4">
          {/* Icon Circle */}
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <School color="white" />
          </div>

          {/* Text */}
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-gray-900">250+</span>
            <span className="text-sm text-gray-700">Tutors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
