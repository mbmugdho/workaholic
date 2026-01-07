import { Helmet } from 'react-helmet'
import HeroSlider from '../components/home/HeroSlider'
import BestWorkers from '../components/home/BestWorkers'
import Testimonials from '../components/home/Testimonials'
import HowItWorks from '../components/home/HowItWorks'
import PlatformStats from '../components/home/PlatformStats'
import FAQ from '../components/home/FAQ'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Workaholic | Micro-Task & Earning Platform</title>
      </Helmet>

      <HeroSlider />
      <BestWorkers />
      <Testimonials />

      {/* Extra sections (3+) */}
      <HowItWorks />
      <PlatformStats />
      <FAQ />
    </>
  )
}
