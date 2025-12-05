interface DotLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function DotLoader({ size = "md", text }: DotLoaderProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const dotSize = sizeClasses[size];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <div
          className={`${dotSize} bg-primary rounded-full animate-bounce [animation-delay:-0.3s]`}
        ></div>
        <div
          className={`${dotSize} bg-primary rounded-full animate-bounce [animation-delay:-0.15s]`}
        ></div>
        <div className={`${dotSize} bg-primary rounded-full animate-bounce`}></div>
      </div>
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
}
