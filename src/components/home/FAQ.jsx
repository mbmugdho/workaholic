export default function FAQ() {
  const faqs = [
    {
      q: "How do coins work?",
      a: "Buyers purchase coins to create tasks. Workers earn coins when submissions are approved.",
    },
    {
      q: "When can a worker withdraw?",
      a: "Workers can request withdrawal when they have at least 200 coins. Withdrawal rate is 20 coins = 1 USD.",
    },
    {
      q: "Can buyers reject a submission?",
      a: "Yes. Rejected submissions update the status and reopen the worker slot for the task.",
    },
    {
      q: "Is the dashboard role-based?",
      a: "Yes. Workers, Buyers, and Admins see different navigation items and features.",
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <p className="text-sm text-base-content/70 mt-1">
          Answers to common questions about Workaholic.
        </p>

        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="collapse collapse-arrow bg-base-100 border">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">{f.q}</div>
              <div className="collapse-content">
                <p className="text-sm text-base-content/70">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}