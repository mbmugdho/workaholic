import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import gsap from 'gsap'
import { fetchPublicStats } from '../../services/userService'
import Loading from '../common/Loading'

function StatBox({ label, value }) {
  return (
    <div className="stat bg-base-100 border rounded-xl shadow-sm">
      <div className="stat-title">{label}</div>
      <div className="stat-value text-primary">{value}</div>
      <div className="stat-desc">Updated live from the platform</div>
    </div>
  )
}

export default function PlatformStats() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-stats'],
    queryFn: fetchPublicStats,
  })

  const stats = useMemo(() => data?.stats || null, [data])

  const [animated, setAnimated] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalTasks: 0,
    totalSubmissions: 0,
  })

  useEffect(() => {
    if (!stats) return

    const obj = { ...animated }
    const tl = gsap.timeline()

    tl.to(obj, {
      duration: 0.9,
      totalWorkers: stats.totalWorkers,
      totalBuyers: stats.totalBuyers,
      totalTasks: stats.totalTasks,
      totalSubmissions: stats.totalSubmissions,
      ease: 'power2.out',
      onUpdate: () => setAnimated({ ...obj }),
    })

    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats])

  return (
    <section className="py-10 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Platform stats</h2>
        <p className="text-sm text-base-content/70 mt-1">
          Quick snapshot of activity across the platform.
        </p>

        <div className="mt-6">
          {isLoading ? (
            <Loading label="Loading stats..." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatBox label="Workers" value={animated.totalWorkers} />
              <StatBox label="Buyers" value={animated.totalBuyers} />
              <StatBox label="Tasks" value={animated.totalTasks} />
              <StatBox label="Submissions" value={animated.totalSubmissions} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
