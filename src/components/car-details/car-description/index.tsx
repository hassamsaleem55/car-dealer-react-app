import Button from "@elements-dir/button";
import { useState, useRef, useEffect } from "react";

// Convert markdown-style text to HTML
function parseMarkdown(text: string): string {
  let html = text;

  // Bold text: **text** or __text__
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic text: *text* or _text_
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Bullet points: * item or - item at start of line
  html = html.replace(/^[\*\-]\s+(.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`);

  // Line breaks
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith("<")) {
    html = `<p>${html}</p>`;
  }

  return html;
}

export default function CarDescription({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>(0);
  const textRef = useRef<HTMLDivElement>(null);

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
    <section className="col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
      <h2 className="text-lg md:text-2xl font-semibold mb-5">Description</h2>

      {/* Animated wrapper */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: expanded
            ? textRef.current?.scrollHeight
            : `${collapsedHeight}px`,
        }}
      >
        {/* <p ref={textRef} className="text-sm md:text-base leading-relaxed">
          {description}
        </p> */}

        <div
          ref={textRef}
          className="text-sm md:text-base leading-relaxed prose prose-sm md:prose-base max-w-none
            [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-2
            [&>strong]:font-bold [&>strong]:text-gray-900"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }}
        />
      </div>

      {/* Gradient fade for collapsed state */}
      {!expanded && isClamped && (
        <div className="relative -mt-10 h-10 pointer-events-none" />
      )}

      {isClamped && (
        <div className="mt-4">
          <Button
            variant="secondary"
            widthUtilities="md:w-30"
            btnTextSize="text-sm md:text-base font-semibold"
            roundUtilities="rounded-lg"
            paddingUtilities="px-4 py-2"
            btnText={expanded ? "Read less" : "Read more"}
            clickEvent={() => setExpanded((prev) => !prev)}
          />
        </div>
      )}
    </section>
  );
}
