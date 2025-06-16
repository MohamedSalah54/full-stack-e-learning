import HeroBannerFixed from "@/components/home/HeroBannerFixed"
import HeroBannerSlider from "@/components/home/HeroBannerSlider"
import HeroCategories from "@/components/home/HeroCategories"
import HeroPlans from "@/components/home/HeroPlans"

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center">
        <HeroBannerSlider/>
        <HeroCategories/>
        <HeroBannerFixed/>
        <HeroPlans/>
        <
    </main>
  )
}

export default Home