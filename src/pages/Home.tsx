import HeroSection from "../components/Home/hero"
import StatsSection from "../components/Home/statsSection"
import FeatureCards from "../components/Home/featureCards"
import WhyChooseUs from "../components/Home/whyChooseUs"
import Footer from "../components/Footer"


export default function Home() {
  return (
    <div className="space-y-10 w-full">
        
      <HeroSection />
      <StatsSection />
      <FeatureCards />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}