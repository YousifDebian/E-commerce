import HeroSlider from "@/components/Home/HeroSlider";
import Categories from "@/components/Home/Categories";
import PromoBanners from "@/components/Home/PromoBanners";
import FeaturedProducts from "@/components/Home/FeaturedProducts";

 import Newsletter from "@/components/Home/Newsletter";


export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Categories />
      <PromoBanners />
      <FeaturedProducts />
      <Newsletter /> 
      
    </main>
  );
}