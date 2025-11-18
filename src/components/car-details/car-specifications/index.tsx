import { useState, useRef, useEffect, useMemo } from "react";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { type CarSpecs } from "@core-dir/helpers/CarDetailsSpecsProcessor";

export default function CarSpecifications({
  specifications,
}: {
  specifications: CarSpecs[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /** === Sticky Header Detection === */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const header = headerRef.current;
    if (!sentinel || !header) return;

    const computedTop = getComputedStyle(header).top;
    const fallbackTop = 120; // matches CSS top-30 (~7.5rem)
    const topPx =
      computedTop && computedTop !== "auto"
        ? parseFloat(computedTop)
        : fallbackTop;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      {
        root: null,
        threshold: 1,
        rootMargin: `-${topPx}px 0px 0px 0px`,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /** === Filtered Specifications by Search Term === */
  const filteredSpecifications = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return specifications;

    return specifications
      .map((category) => ({
        ...category,
        specs: category.specs.filter(
          (s) =>
            s.label.toLowerCase().includes(term) ||
            String(s.value).toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.specs.length > 0);
  }, [searchTerm, specifications]);

  /** === Render === */
  return (
    <section className="col-span-2 bg-white rounded-2xl shadow-md border border-gray-100">
      {/* Sentinel for Sticky Detection */}
      <div ref={sentinelRef} className="w-full h-0" />

      {/* === Sticky Header === */}
      <div
        ref={headerRef}
        className={`sticky top-30 z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
          px-8 py-4 mb-2 bg-white
          ${
            isSticky
              ? "shadow-md bg-linear-to-r from-primary/20 via-primary/10 to-white"
              : "shadow-none rounded-t-2xl"
          }`}
      >
        <h2 className="text-2xl font-semibold">Specifications</h2>
        <input
          id="searchSpecification"
          type="text"
          placeholder="Search Specification..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-200 rounded-xl shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
      </div>

      {/* === Specifications Grid === */}
      <div
        ref={wrapperRef}
        className="overflow-hidden transition-all duration-500 ease-in-out px-8 pb-6"
      >
        <div className="columns-1 sm:columns-2 gap-4">
          {filteredSpecifications.length ? (
            filteredSpecifications.map((spec, idx) => (
              <div
                key={idx}
                className="break-inside-avoid mb-4 bg-white text-gray-800 rounded-xl border border-primary/30 shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
              >
                <div className="font-semibold">
                  <span>{spec.category}</span>
                </div>
                <div className="px-4 pb-4 pt-4 text-sm">
                  {spec.specs.map((item, itemIdx) => (
                    <MotionReveal key={itemIdx} preset="zoomOut" once={true}>
                      <div className="flex items-center justify-between py-1 border-b border-gray-200">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                    </MotionReveal>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-sm italic">
              No specification found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
