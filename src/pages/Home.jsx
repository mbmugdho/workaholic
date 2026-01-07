import usePageTitle from "../hooks/usePageTitle";
import HeroSlider from "../components/home/HeroSlider";
import BestWorkers from "../components/home/BestWorkers";
import Testimonials from "../components/home/Testimonials";
import HowItWorks from "../components/home/HowItWorks";
import PlatformStats from "../components/home/PlatformStats";
import FAQ from "../components/home/FAQ";

export default function Home() {
  usePageTitle("Workaholic | Micro-Task & Earning Platform");

  return (
    <>
      <HeroSlider />
      <BestWorkers />
      <Testimonials />
      <HowItWorks />
      <PlatformStats />
      <FAQ />
    </>
  );
}
