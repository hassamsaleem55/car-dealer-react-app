import { useState, useRef, useEffect } from "react";

export default function WarrantyPlansOne({
  plans,
}: {
  plans: { title: string; description: string; features: string[] }[];
}) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
        Compare Our Warranty Plans
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function PlanCard({
  plan,
}: {
  plan: { title: string; description: string; features: string[] };
}) {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { root: null, threshold: 1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="border border-primary/40 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col relative">
      <div ref={sentinelRef} className="w-full h-0" />

      <div
        className={`sticky top-20 z-10 bg-gray-50 px-5 py-4 border-b border-gray-100 transition-all duration-300 ${
          isSticky
            ? "shadow-md"
            : "shadow-none rounded-t-2xl"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
        <p className="text-sm sm:text-base">{plan.description}</p>
      </div>

      <div className="p-6 overflow-y-auto">
        <ul className="space-y-2">
          {plan.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start text-sm gap-2 text-gray-600"
            >
              <span className="text-primary font-bold mt-1">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
