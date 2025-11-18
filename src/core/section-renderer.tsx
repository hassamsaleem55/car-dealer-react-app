import React from "react";
import { type DealerSectionKeys} from "@types-dir/dealer-props";

// Preload all section variant entry points
const sectionModules = import.meta.glob("../sections/**/variants/index.tsx");

export default function SectionRenderer({
  sections,
}: {
  sections: DealerSectionKeys[];
}) {
  return (
    <>
      {sections.map((section, i) => {
        const { folderName, variant, props } = section;
        const key = `../sections/${folderName}/variants/index.tsx`;
        const loader = sectionModules[key];

        if (!loader) {
          console.error(` Section not found for path: ${key}`);
          return (
            <div key={i} className="text-red-600">
              Section{" "}
              <strong>
                {folderName}-{variant}
              </strong>{" "}
              not found.
            </div>
          );
        }

        const Section = React.lazy(async () => {
          try {
            const m = (await loader()) as Record<
              string,
              React.ComponentType<any>
            >;
            const Comp = m[variant];
            if (!Comp) {
              throw new Error(
                `Variant '${variant}' not found in ${key}. Available exports: ${Object.keys(
                  m
                ).join(", ")}`
              );
            }
            return { default: Comp };
          } catch (err) {
            console.error(`Failed to load section ${name}-${variant}:`, err);
            throw err;
          }
        });

        return (
          <React.Suspense
            key={i}
            //     fallback={
            //       <div className="text-gray-500 italic">
            //         Loading section{" "}
            //         <strong>
            //           {name}-{variant}
            //         </strong>
            //         ...
            //       </div>
            //     }>
          >
            <Section props={props} />
          </React.Suspense>
        );
      })}
    </>
  );
}
