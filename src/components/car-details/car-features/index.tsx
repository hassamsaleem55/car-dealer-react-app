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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="col-span-2 bg-white rounded-2xl shadow-md border border-gray-100">
      {/* === Sentinel for sticky detection === */}
      <div ref={sentinelRef} className="w-full h-0" />

      {/* === Header (sticky) === */}
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
        <h2 className="text-2xl font-semibold">Features</h2>
        <input
          type="text"
          placeholder="Search Feature..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setExpanded(false);
          }}
          className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-200 rounded-xl shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
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
              <MotionReveal key={idx} preset="zoomOut" delay={idx * 0.001} once>
                <div className="bg-gray-100 text-gray-800 rounded-md p-3">
                  <div className="flex gap-2">
                    {/* Icon Circle */}
                    <span className="flex items-center justify-center w-5 h-5 border border-primary rounded-full shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>

                    {/* Feature Text */}
                    <span className="text-sm font-medium">{feature.name}</span>
                  </div>
                </div>
              </MotionReveal>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-sm italic">
              No features found.
            </p>
          )}
        </div>
      </div>

      {/* === Fade Gradient when collapsed === */}
      {!expanded && isClamped && (
        <div className="relative h-10 bg-linear-to-t from-white to-transparent pointer-events-none" />
      )}

      {/* === Show More / Show Less === */}
      {isClamped && (
        <div className="mt-3 flex justify-center pb-6">
          <Button
            variant="secondary"
            widthUtilities="w-36"
            btnText={expanded ? "Show less" : "Show more"}
            clickEvent={() => setExpanded((p) => !p)}
          />
        </div>
      )}
    </section>
  );
}
