export default function PagesContentOne({
  heading,
  paragraphs,
  points,
  mediaLinks,
  variantType,
}: {
  heading: string;
  paragraphs: string[];
  points?: { heading: string; description: string }[];
  mediaLinks: { type: "image" | "video"; urls: string[] };
  variantType: "left" | "right";
}) {
  const isLeft = variantType === "left";

  return (
    <section className="container mx-auto px-4">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-16 border-b border-gray-300`}
      >
        {/* === Text Section === */}
        <div className={`${isLeft ? "order-1" : "order-2"} space-y-6`}>
          <h2 className="text-3xl font-bold leading-tight">{heading}</h2>

          {paragraphs.map((para, index) => (
            <p key={index} className="leading-relaxed text-lg">
              {para}
            </p>
          ))}

          {points && points.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-primary/40 hover:shadow-xl hover:shadow-primary/15 transition-all ease-in-out duration-300"
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {point.heading}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === Video Section === */}
        <div className={`${isLeft ? "order-1 md:order-2" : "order-2 md:order-1"}`}>
          {mediaLinks.urls.length > 0 && (
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
              {mediaLinks.type === "image" ? (
                <img
                  className="w-full h-full"
                  src={mediaLinks.urls[0]}
                  alt={heading}
                />
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={mediaLinks.urls[0]}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
