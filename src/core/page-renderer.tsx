import React, { useMemo } from "react";
import type {
  DealerPageKeys,
  DealerSectionKeys,
} from "@types-dir/dealer-props";
import { useDealerContext } from "@core-dir/dealer-provider";
import {
  HomeSkeleton,
  StockSkeleton,
  CarDetailsSkeleton,
  ContentPageSkeleton,
  ContactPageSkeleton,
  DefaultPageSkeleton,
} from "@components-dir/loader/PageSkeleton";

const sectionModules = import.meta.glob("../sections/**/variants/index.tsx");

export default function PageRenderer({ page }: { page: DealerPageKeys }) {
  const { dealerData } = useDealerContext();
  
  const filteredSections = useMemo(
    () =>
      page.sections?.filter((section: DealerSectionKeys) => {
        // Exclude finance page if dealer has FCANumber
        if (
          section.folderName === "trusted-partner" &&
          !dealerData.FCANumber
        ) {
          return false;
        }
        return true;
      }) || [],
    [page.sections, dealerData.FCANumber]
  );

  // Select appropriate skeleton based on page name
  const getPageSkeleton = () => {
    switch (page.pageName) {
      case "home":
        return <HomeSkeleton />;
      case "stock":
        return <StockSkeleton />;
      case "car-details":
        return <CarDetailsSkeleton />;
      case "contact":
        return <ContactPageSkeleton />;
      case "privacy-policy":
      case "terms-of-service":
      case "about":
      case "warranty":
      case "finance":
        return <ContentPageSkeleton />;
      default:
        return <DefaultPageSkeleton />;
    }
  };

  return (
    <>
      {filteredSections.map((section: DealerSectionKeys, i) => {
        const { isShared, folderName, variant, props } = section;
        const key = `../sections/${
          isShared ? "shared" : page.pageName
        }/${folderName}/variants/index.tsx`;
        const loader = sectionModules[key];

        if (!loader) {
          console.error(`Section not found for path: ${key}`);
          return (
            <div key={i} className="text-red-500 p-4">
              Section not found: {key}
            </div>
          );
        }

        const name = `${isShared ? "shared" : page.pageName}-${folderName}`;
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
          <React.Suspense key={i} fallback={getPageSkeleton()}>
            <Section props={props} />
          </React.Suspense>
        );
      })}
    </>
  );
}
