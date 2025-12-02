"use client";
import { aboutUs_bottom_left, aboutUs_top_right } from "@/assets";
import Image from "next/image";

export default function HeroSectionStory() {
  return (
    <section className="w-[1321px] h-[514px] flex justify-between mx-auto ">
      {/* Left Text Section */}
      <div className="w-[750px] h-[383px] flex flex-col gap-8">
        <h2 className="text-[64px] font-extrabold leading-[100%] text-[#232323]">
          our story
        </h2>

        <p className="w-[750px] h-[264px] text-[24px] leading-[100%] font-normal text-[#2C313A]">
          At the heart of our journey is a simple belief: everyone deserves the
          chance to learn and grow. We started this platform not as a company,
          but as a group of people who deeply care about others teachers,
          designers, creators coming together to make learning more human, more
          accessible, and more meaningful. Every course we create, every lesson
          we share, is built with empathy, understanding, and a real desire to
          help. Our story isn’t just about us, it’s about every learner who
          dares to dream, and we’re here to walk beside them.
        </p>
      </div>

      {/* Right Images Section */}
      <div className="w-[554px] h-[400px] border border-black relative rounded-lg">
        {/* Top Right Image */}
        <Image
          src={aboutUs_top_right}
          alt="story image 1"
          width={376}
          height={246}
          className="rounded-[10px] absolute -top-20 -right-15"
        />

        {/* Bottom Left Image  */}
        <Image
          src={aboutUs_bottom_left}
          alt="story image 2"
          width={376}
          height={246}
          className="rounded-[10px] absolute -bottom-20 -left-15"
        />
      </div>
    </section>
  );
}
