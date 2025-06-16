import HeroBannerFixed from "@/components/home/HeroBannerFixed"
import HeroBannerSlider from "@/components/home/HeroBannerSlider"
import HeroCategories from "@/components/home/HeroCategories"
import HeroPlans from "@/components/home/HeroPlans"
import HeroTestimonials from "@/components/home/HeroTestimonials"

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center">
        <HeroBannerSlider/>
        <HeroCategories/>
        <HeroPlans/>
        <HeroTestimonials/>
    </main>
  )
}

export default Home