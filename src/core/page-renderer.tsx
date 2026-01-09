import React, { useMemo, useEffect } from "react";
import type {
  BaseDealerPage,
  DealerSectionKeys,
} from "@types-dir/dealer-props";
import { useDealerContext } from "@core-dir/dealer-provider";
import { usePageMeta } from "@core-dir/page-meta-context";

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

  return (
    <>
      {filteredSections.map((section: DealerSectionKeys, i) => {
        const { isShared, folderName, variant, props } = section;
        const key = `../sections/${
          isShared ? "shared" : page.pageName
        }/${folderName}/variants/index.tsx`;
        const loader = sectionModules[key];

        if (!loader) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Section not found for path: ${key}`);
          }
          return (
            <div key={i} className="text-red-500 p-4" role="alert">
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
            if (process.env.NODE_ENV === 'development') {
              console.error(`Failed to load section ${name}-${variant}:`, err);
            }
            throw err;
          }
        });

        return (
          <React.Suspense 
            key={i} 
            fallback={
              <div className="animate-pulse bg-gray-100 h-64 md:h-96 rounded-lg" />
            }
          >
            <Section props={props} />
          </React.Suspense>
        );
      })}
    </>
  );
}


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
