import React, { useMemo, useEffect } from "react";
import type {
  BaseDealerPage,
  DealerSectionKeys,
} from "@types-dir/dealer-props";
import { useDealerContext } from "@core-dir/dealer-provider";
import { usePageMeta } from "@core-dir/page-meta-context";
// import {
//   HomeSkeleton,
//   StockSkeleton,
//   CarDetailsSkeleton,
//   ContentPageSkeleton,
//   ContactPageSkeleton,
//   DefaultPageSkeleton,
// } from "@components-dir/loader/PageSkeleton";

const sectionModules = import.meta.glob("../sections/**/variants/index.tsx");

export default function PageRenderer({ page }: { page: BaseDealerPage }) {
  const { dealerData } = useDealerContext();
  const { setPageMeta } = usePageMeta();

  // Update page meta context for MetaManager to consume
  useEffect(() => {
    setPageMeta({
      title: page.title,
      description: page.description,
    });
  }, [page.title, page.description, setPageMeta]);

  const filteredSections = useMemo(
    () =>
      page.sections?.filter((section: DealerSectionKeys) => {
        // Exclude finance page if dealer has FCANumber
        if (
          section.folderName === "trusted-partner" &&
          !dealerData.FCANumber &&
          dealerData.dealerData.CompanyFinanceDetails.FinanceCompanies
            .length === 0
        )
          return false;
        // else if (section.folderName === "ready-set-sold") return false;
        return true;
      }) || [],
    [page.sections, dealerData.FCANumber]
  );

  // Select appropriate skeleton based on page name
  // const getPageSkeleton = () => {
  //   switch (page.pageName) {
  //     case "home":
  //       return <HomeSkeleton />;
  //     case "stock":
  //       return <StockSkeleton />;
  //     case "car-details":
  //       return <CarDetailsSkeleton />;
  //     case "contact":
  //       return <ContactPageSkeleton />;
  //     case "privacy-policy":
  //     case "terms-of-service":
  //     case "about":
  //     case "warranty":
  //     case "finance":
  //       return <ContentPageSkeleton />;
  //     default:
  //       return <DefaultPageSkeleton />;
  //   }
  // };

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
          <React.Suspense key={i}>
            <Section props={props} />
          </React.Suspense>
        );
      })}
    </>
  );
}

// import React, { useMemo, useEffect } from "react";
// import type { BaseDealerPage, DealerSectionKeys } from "@types-dir/dealer-props";
// import { useDealerContext } from "@core-dir/dealer-provider";

// const sectionModules = import.meta.glob("../sections/**/variants/index.tsx");

// export default function PageRenderer({ page }: { page: BaseDealerPage }) {
//   const { dealerData } = useDealerContext();

//   // Update meta tags and title
//   useEffect(() => {
//     document.title = page.title || "Motors Hub";

//     const updateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
//       let metaTag: HTMLMetaElement | null;
//       if (isProperty) {
//         metaTag = document.querySelector(`meta[property='${nameOrProperty}']`);
//       } else {
//         metaTag = document.querySelector(`meta[name='${nameOrProperty}']`);
//       }

//       if (metaTag) {
//         metaTag.setAttribute("content", content);
//       } else {
//         const meta = document.createElement("meta");
//         if (isProperty) meta.setAttribute("property", nameOrProperty);
//         else meta.name = nameOrProperty;
//         meta.content = content;
//         document.head.appendChild(meta);
//       }
//     };

//     updateMeta("description", page.description || "");
//     updateMeta("og:title", page.title || "", true);
//     updateMeta("og:description", page.description || "", true);
//   }, [page.title, page.description]);

//   // Filter sections based on dealer config
//   const filteredSections = useMemo(
//     () =>
//       page.sections?.filter((section: DealerSectionKeys) => {
//         if (
//           section.folderName === "trusted-partner" &&
//           !dealerData.FCANumber &&
//           dealerData.dealerData.CompanyFinanceDetails.FinanceCompanies.length === 0
//         ) return false;
//         return true;
//       }) || [],
//     [page.sections, dealerData.FCANumber]
//   );

//   return (
//     <>
//       {filteredSections.map((section: DealerSectionKeys, i) => {
//         const { isShared, folderName, variant, props } = section;
//         const key = `../sections/${isShared ? "shared" : page.pageName}/${folderName}/variants/index.tsx`;
//         const loader = sectionModules[key];

//         if (!loader) {
//           console.error(`Section not found for path: ${key}`);
//           return (
//             <div key={i} className="text-red-500 p-4">
//               Section not found: {key}
//             </div>
//           );
//         }

//         const name = `${isShared ? "shared" : page.pageName}-${folderName}`;
//         const Section = React.lazy(async () => {
//           try {
//             const m = (await loader()) as Record<string, React.ComponentType<any>>;
//             const Comp = m[variant];
//             if (!Comp) {
//               throw new Error(
//                 `Variant '${variant}' not found in ${key}. Available exports: ${Object.keys(m).join(", ")}`
//               );
//             }
//             return { default: Comp };
//           } catch (err) {
//             console.error(`Failed to load section ${name}-${variant}:`, err);
//             throw err;
//           }
//         });

//         return (
//           <React.Suspense
//             key={i}
//             // fallback={<DefaultSkeleton />} // optionally add a skeleton here
//           >
//             <Section props={props} />
//           </React.Suspense>
//         );
//       })}
//     </>
//   );
// }
