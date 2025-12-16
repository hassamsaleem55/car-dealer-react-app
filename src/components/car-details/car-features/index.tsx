import { useState, useRef, useEffect, useMemo } from "react";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import Button from "@elements-dir/button";
import { Check } from "lucide-react";

interface CarFeaturesProps {
  features: { name: string }[];
}

export default function CarFeatures({ features }: CarFeaturesProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // === Filtered Features (memoized for performance)
  const filteredFeatures = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return features.filter((f) => f.name.toLowerCase().includes(term));
  }, [features, searchTerm]);

  // === Measure collapsed height and detect if clamping is needed
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cardHeight = 60; // approximate height per row
    const visibleRows = 8;
    const maxCollapsed = cardHeight * visibleRows;

    setCollapsedHeight(maxCollapsed);

    const checkClamped = () => {
      setIsClamped(wrapper.scrollHeight > maxCollapsed + 5);
    };

    checkClamped();
    window.addEventListener("resize", checkClamped);
    return () => window.removeEventListener("resize", checkClamped);
  }, [features, searchTerm]);

  // === Sticky header detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const header = headerRef.current;
    if (!sentinel || !header) return;

    const computedTop = getComputedStyle(header).top;
    const fallbackTop = 120; // matches Tailwind top-[7.5rem] ~ top-30
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

  return (
    <section
      ref={sectionRef}
      className="col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200"
    >
      {/* === Sentinel for sticky detection === */}
      <div ref={sentinelRef} className="w-full h-0" />

      {/* === Header (sticky) === */}
      <div
        ref={headerRef}
        className={`sticky top-16 md:top-20 z-999 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4
           bg-white text-gray-600 bg-linear-to-r from-transparent to-violet-200/70 transition-all duration-200 ease-in-out
          ${
            isSticky
              ? "px-4 py-3 md:px-8 md:py-4 shadow-xl md:shadow-lg rounded-b-2xl md:rounded-none"
              : "px-4 py-4 md:px-8 md:py-4 mb-2 shadow-none rounded-t-2xl"
          }`}
      >
        <h2 className="text-lg md:text-2xl font-semibold ">Features</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Feature..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setExpanded(false);
              moveToTop();
            }}
            className="w-full px-3 py-2 pr-8 text-xs md:text-sm border border-gray-300 rounded-xl shadow-sm bg-white
              focus:outline-none focus:ring-0.5 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setExpanded(false);
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

      {/* === Features Grid (collapsible wrapper) === */}
      <div
        ref={wrapperRef}
        className="overflow-hidden transition-all duration-500 ease-in-out px-8 pb-6"
        style={{
          maxHeight: expanded
            ? wrapperRef.current?.scrollHeight
            : `${collapsedHeight}px`,
        }}
      >
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"> */}
        <div className="columns-1 sm:columns-3 space-y-2">
          {filteredFeatures.length ? (
            filteredFeatures.map((feature, idx) => (
              <MotionReveal key={idx} preset="zoomOut" delay={idx * 0.001}>
                <div className=" rounded-lg p-2.5 md:p-3 border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300">
                  <div className="flex gap-2 items-start">
                    {/* Icon Circle */}
                    <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 border-2 border-primary/60 bg-primary/10 rounded-full shrink-0">
                      <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                    </span>

                    {/* Feature Text */}
                    <span className="break-inside-avoid text-xs md:text-sm font-semibold">
                      {feature.name}
                    </span>
                  </div>
                </div>
              </MotionReveal>
            ))
          ) : (
            <p className="flex flex-row py-6 gap-3 text-gray-500 text-xs md:text-sm italic">
              <span>No features found for "{searchTerm}".</span>
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

      {/* === Fade Gradient when collapsed === */}
      {!expanded && isClamped && (
        <div className="relative h-4 md:h-10 pointer-events-none" />
      )}

      {/* === Show More / Show Less === */}
      {isClamped && (
        <div className="md:mt-3 flex justify-center pb-6">
          <Button
            variant="secondary"
            widthUtilities="md:w-40"
            btnTextSize="text-sm md:text-base font-semibold"
            roundUtilities="rounded-lg"
            btnText={expanded ? "Show less" : "Show more"}
            clickEvent={() => {
              setExpanded((prev) => {
                const newValue = !prev;
                if (prev && sectionRef.current) {
                  moveToTop();
                }
                return newValue;
              });
            }}
          />
        </div>
      )}
    </section>
  );
}
