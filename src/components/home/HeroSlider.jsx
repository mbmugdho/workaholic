import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import gsap from 'gsap'

import 'swiper/css'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  const slides = [
    {
      kicker: 'For Workers',
      title: 'Complete small tasks, earn coins.',
      desc: 'Pick tasks that fit your skills and build steady earnings through consistent submissions.',
    },
    {
      kicker: 'For Buyers',
      title: 'Launch campaigns and get work done fast.',
      desc: 'Create tasks, review submissions, and pay only when requirements are met.',
    },
    {
      kicker: 'For Everyone',
      title: 'A fair system with clear rules.',
      desc: 'Role-based dashboards, transparent coin logic, and notifications to keep you updated.',
    },
  ]

  return (
    <section ref={wrapRef} className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="card bg-base-100 border shadow-sm overflow-hidden">
          <div className="card-body p-0">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
            >
              {slides.map((s, idx) => (
                <SwiperSlide key={idx}>
                  <div className="p-8 md:p-12 bg-gradient-to-br from-base-100 to-base-200">
                    <div className="max-w-2xl">
                      <div className="badge badge-outline hero-anim">
                        {s.kicker}
                      </div>
                      <h1 className="text-3xl md:text-5xl font-extrabold mt-4 hero-anim">
                        {s.title}
                      </h1>
                      <p className="text-base md:text-lg text-base-content/75 mt-4 hero-anim">
                        {s.desc}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-3 hero-anim">
                        <a className="btn btn-primary" href="/register">
                          Get Started
                        </a>
                        <a className="btn btn-outline" href="/login">
                          Login
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
