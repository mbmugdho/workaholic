import { useQuery } from '@tanstack/react-query'
import { fetchTopWorkers } from '../../services/userService'
import Loading from '../common/Loading'
import EmptyState from '../common/EmptyState'

export default function BestWorkers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['top-workers'],
    queryFn: fetchTopWorkers,
  })

  if (isLoading) return <Loading label="Loading best workers..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load best workers"
        message="Please try again later."
      />
    )
  }

  const workers = data?.workers || []

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Best Workers</h2>
            <p className="text-sm text-base-content/70 mt-1">
              Top contributors ranked by available coins.
            </p>
          </div>
        </div>

        {workers.length === 0 ? (
          <EmptyState
            title="No workers found yet"
            message="As workers earn coins, they will appear here."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workers.map((w) => (
              <div
                key={w.email}
                className="card bg-base-100 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img
                          src={
                            w.photoURL ||
                            'https://i.ibb.co/2nS2d4b/default-user.png'
                          }
                          alt={w.displayName || 'Worker'}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">
                        {w.displayName}
                      </h3>
                      <p className="text-xs text-base-content/70">{w.email}</p>
                    </div>

                    <div className="text-right">
                      <div className="badge badge-primary badge-outline">
                        {w.coins} coins
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-base-content/70">
                    Consistent task performance and reliable submissions.
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
