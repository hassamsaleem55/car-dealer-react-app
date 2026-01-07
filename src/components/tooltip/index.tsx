import { useRef, useState, useEffect } from "react";

export default function TooltipText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Use requestAnimationFrame to batch layout reads and prevent forced reflows
    const rafId = requestAnimationFrame(() => {
      setIsTruncated(
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
      );
    });

    return () => cancelAnimationFrame(rafId);
  }, [text]);

  return (
    <div className="relative group">
      <p ref={textRef} className={className}>
        {text}
      </p>
      {isTruncated && <span className="tooltip">{text}</span>}
    </div>
  );
}
