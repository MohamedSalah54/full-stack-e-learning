import HeroSectionCards from "@/components/home/about-us/HeroSectionCards";
import HeroSectionCircle from "@/components/home/about-us/HeroSectionCircle";
import HeroSectionStory from "@/components/home/about-us/HeroSectionStory";

export default function AboutUs() {
  return (
    <>
      <HeroSectionCircle />
      <HeroSectionCards />
      <div className="mt-40 mb-10">
        <HeroSectionStory />
      </div>
    </>
  );
}
