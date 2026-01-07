export default function HowItWorks() {
  const steps = [
    {
      title: 'Create an account',
      desc: 'Register as a Worker or Buyer and complete your profile.',
    },
    {
      title: 'Start your workflow',
      desc: 'Workers pick tasks and submit proof. Buyers create tasks and review submissions.',
    },
    {
      title: 'Earn and manage coins',
      desc: 'Approved work adds coins to workers. Buyers purchase coins to fund tasks.',
    },
    {
      title: 'Withdraw securely',
      desc: 'Workers can request withdrawals when they meet the minimum coin threshold.',
    },
  ]

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <p className="text-sm text-base-content/70 mt-1">
          A simple flow for Workers, Buyers, and Admins.
        </p>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.title} className="card bg-base-100 border shadow-sm">
              <div className="card-body">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-base-content/70 mt-2">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
