import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import UserAvatar from '../common/UserAvatar'

const testimonials = [
  {
    name: 'Ayesha Rahman',
    photo: 'https://i.ibb.co/2nS2d4b/default-user.png',
    quote:
      'The task details are clear and the dashboard makes it easy to track approvals and earnings.',
  },
  {
    name: 'Siam Hasan',
    photo: 'https://i.ibb.co/2nS2d4b/default-user.png',
    quote:
      'As a buyer, I can review submissions quickly and stay organized with the status updates.',
  },
  {
    name: 'Nusrat Jahan',
    photo: 'https://i.ibb.co/2nS2d4b/default-user.png',
    quote:
      'The coin system is transparent. I always know how much I can withdraw and when.',
  },
  {
    name: 'Tanvir Ahmed',
    photo: 'https://i.ibb.co/2nS2d4b/default-user.png',
    quote:
      'Responsive UI and smooth transitions. The experience feels modern and fast.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-10 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Testimonials</h2>
        <p className="text-sm text-base-content/70 mt-1">
          What users say about their experience on Workaholic.
        </p>

        <div className="mt-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="card bg-base-100 border shadow-sm h-full">
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <UserAvatar
                            photoURL={t.photoURL}
                            displayName={t.name}
                            email={t.email}
                            size={56}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-base-content/70">
                          Verified user
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-base-content/75 mt-4">
                      “{t.quote}”
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
