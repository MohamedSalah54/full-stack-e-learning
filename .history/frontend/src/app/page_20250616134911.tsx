import HeroBannerFixed from "@/components/home/HeroBannerFixed"
import HeroBannerSlider from "@/components/home/HeroBannerSlider"
import HeroCategories from "@/components/home/HeroCategories"

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center">
        <HeroBannerSlider/>
        <HeroCategories/>
        <HeroBannerFixed/>
        <
    </main>
  )
}

export default Home