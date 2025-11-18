import { useState, useRef, useEffect } from "react";

export default function CarDescription({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Calculate height for 4 lines (approx based on line-height)
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "24");
    const visibleLines = 4;
    const maxCollapsed = lineHeight * visibleLines;
    setCollapsedHeight(maxCollapsed);

    // Check if text overflows
    const checkClamped = () => {
      setIsClamped(el.scrollHeight > maxCollapsed + 1);
    };

    checkClamped();
    window.addEventListener("resize", checkClamped);
    return () => window.removeEventListener("resize", checkClamped);
  }, [description]);

  return (
    <section className="col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      <h2 className="text-2xl font-semibold mb-4">Description</h2>

      {/* Animated wrapper */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: expanded
            ? textRef.current?.scrollHeight
            : `${collapsedHeight}px`,
        }}
      >
        <p ref={textRef} className="leading-relaxed">
          {description}
        </p>
      </div>

      {/* Gradient fade for collapsed state */}
      {!expanded && isClamped && (
        <div className="relative -mt-10 h-10 bg-linear-to-t from-white to-transparent pointer-events-none" />
      )}

      {isClamped && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-primary hover:underline focus:outline-none cursor-pointer"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </section>
  );
}
