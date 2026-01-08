import React from "react";
import { useDealerContext } from "./dealer-provider";
import { NavbarSkeleton, FooterSkeleton } from "@components-dir/loader/LayoutSkeleton";

export default function LayoutRenderer({ module }: { module: string }) {
  const { dealerConfig } = useDealerContext();

  const Component = React.lazy(async () => {
    const variant = dealerConfig[module as keyof typeof dealerConfig] as string;

    try {
      const m = await import(`../app-layouts/${module}/variants/index.tsx`);
      const Comp = m[variant];

      if (!Comp) {
        throw new Error(
          `Variant '${variant}' not found in ../app-layouts/${module}/variants/index.tsx. ` +
            `Available exports: ${Object.keys(m).join(", ")}`
        );
      }

      return { default: Comp };
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to load ${module}-${variant}:`, err);
      }
      throw err;
    }
  });

  // Get appropriate skeleton based on module type
  const getSkeleton = () => {
    switch (module) {
      case "navbar":
        return <NavbarSkeleton />;
      case "footer":
        return <FooterSkeleton />;
      default:
        return <div className="animate-pulse bg-gray-100 h-20" />;
    }
  };

  return (
    <React.Suspense fallback={getSkeleton()}>
      <Component />
    </React.Suspense>
  );
}
