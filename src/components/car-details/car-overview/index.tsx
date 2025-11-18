import { type Spec } from "../car-details.types";

export default function CarOverview({ specs }: { specs: Spec[] }) {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-primary/20 via-primary/10 to-white px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Overview</h2>
      </div>

      {/* Specs Grid */}
      <div className="p-5 max-h-80 overflow-y-auto">
        {specs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
            {specs.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-primary/30 shadow-sm hover:shadow-md transition-shadow duration-200 text-center px-2 py-5"
              >
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {spec.label}
                </h3>
                <p className="text-sm font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic text-center mt-4">
            No specifications available.
          </p>
        )}
      </div>
    </section>
  );
}
