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

  const sectionRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const moveToTop = () => {
    // sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      sectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50); // Allow re-render before scrolling
  };

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
    <section
      ref={sectionRef}
      className="col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200"
    >
      {/* Sentinel for Sticky Detection */}
      <div ref={sentinelRef} className="w-full h-0" />

      {/* === Sticky Header === */}
      <div
        ref={headerRef}
        className={`sticky top-16 md:top-20 z-999 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4
           bg-white text-gray-600 bg-linear-to-r from-transparent to-violet-200/70 transition-all duration-200 ease-in-out
          ${
            isSticky
              ? "px-4 py-3 md:px-8 md:py-4 shadow-xl rounded-b-2xl md:rounded-none"
              : "px-4 py-4 md:px-8 md:py-4 mb-2 shadow-none rounded-t-2xl"
          }`}
      >
        <h2 className="text-lg md:text-2xl font-semibold">Specifications</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Specification..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              moveToTop();
            }}
            className="w-full px-3 py-2 pr-8 text-xs md:text-sm border border-gray-300 rounded-xl shadow-sm bg-white
              focus:outline-none focus:ring-0.5 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* === Specifications Grid === */}
      <div
        ref={wrapperRef}
        className="overflow-hidden transition-all duration-500 ease-in-out px-4 md:px-8 pb-6"
      >
        <div className="columns-1 sm:columns-2 gap-4">
          {filteredSpecifications.length ? (
            filteredSpecifications.map((spec, idx) => (
              <div
                key={idx}
                className="break-inside-avoid mb-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 p-5 group"
              >
                <div className="text-sm md:text-base font-semibold mb-3">
                  <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{spec.category}</span>
                </div>
                <div className="text-xs md:text-sm">
                  {spec.specs.map((item, itemIdx) => (
                    <MotionReveal key={itemIdx} preset="zoomOut">
                      <div className="flex items-center justify-between py-0.5 px-2 rounded-lg border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-600">{item.label}</span>
                        <span className="font-semibold text-gray-800">{item.value}</span>
                      </div>
                    </MotionReveal>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="flex flex-row py-6 gap-3 text-gray-500 text-xs md:text-sm italic">
              <span>No specification found for "{searchTerm}".</span>
              <span
                className="text-primary cursor-pointer"
                onClick={() => setSearchTerm("")}
              >
                clear search
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
