"use client";
import Loader from "@/components/common/Loader";
import CourseList from "@/components/home/courses/CourseList";
import HeroBannerFixed from "@/components/home/HeroBannerFixed";
import HeroBannerSlider from "@/components/home/HeroBannerSlider";
import HeroCategories from "@/components/home/HeroCategories";
import HeroPlans from "@/components/home/HeroPlans";
import HeroTestimonials from "@/components/home/HeroTestimonials";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Loader loading={loading} />
      </div>
      {/* <Loader loading={loading} /> */}

      {!loading && (
        <>
          <HeroBannerSlider />
          <HeroCategories />
          <CourseList />
          <HeroPlans />
          <HeroTestimonials />
          <HeroBannerFixed />
        </>
      )}
    </main>
  );
};

export default Home;
