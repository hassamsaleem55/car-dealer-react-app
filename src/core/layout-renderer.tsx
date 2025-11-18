import React from "react";
import { useDealerContext } from "./dealer-provider";

export default function LayoutRenderer({ module }: { module: string }) {
  const { dealerConfig } = useDealerContext();

  const Component = React.lazy(async () => {
    const variant = dealerConfig[module];

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
      console.error(`Failed to load ${module}-${variant}:`, err);
      throw err;
    }
  });

  return (
    <React.Suspense
    // fallback={<div>Loading {`${module}-${dealerConfig[module]}`}...</div>}
    >
      <Component />
    </React.Suspense>
  );
}
