import React from "react";
import type {
  DealerPageKeys,
  DealerSectionKeys,
} from "@types-dir/dealer-props";
import { useDealerContext } from "@core-dir/dealer-provider";
const sectionModules = import.meta.glob("../sections/**/variants/index.tsx");

export default function PageRenderer({ page }: { page: DealerPageKeys }) {
  const { dealerData } = useDealerContext();
  return (
    <>
      {page.sections
        ?.filter((section: DealerSectionKeys) => {
          // Exclude finance page if dealer has FCANumber
          if (
            section.folderName === "trusted-partner" &&
            !dealerData.FCANumber
          ) {
            return false;
          }
          return true;
        })
        .map((section: DealerSectionKeys, i) => {
          const { isShared, folderName, variant, props } = section;
          const key = `../sections/${
            isShared ? "shared" : page.pageName
          }/${folderName}/variants/index.tsx`;
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
