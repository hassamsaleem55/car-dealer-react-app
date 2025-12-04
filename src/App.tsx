import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DealerProvider, useDealerContext } from "@core-dir/dealer-provider";
import PageRenderer from "@core-dir/page-renderer";
import Layout from "./Layout";
import { useMemo } from "react";
import { type DealerPageKeys } from "@types-dir/dealer-props";
import PaymentResponse from "./sections/PaymentResponse";

function AppRouter() {
  const { dealerConfig, dealerData } = useDealerContext();

  const router = useMemo(() => {
    const pages: DealerPageKeys[] = dealerConfig?.pages || [];

    const childRoutes: any = pages
      .filter((page: DealerPageKeys) => {
        // Exclude finance page if dealer has FCANumber
        if (page.pageName === "finance" && !dealerData.FCANumber) {
          return false;
        }
        return true;
      })
      .map((page: DealerPageKeys) => {
        const isHome = page.path === "/";

        return {
          index: isHome,
          path: isHome ? undefined : page.path,
          element: <PageRenderer key={page.pageName} page={page} />,
        };
      });

    // Add the PaymentResponse route
    childRoutes.push({
      path: "/Payment/PaymentResponse",
      element: <PaymentResponse />,
    });

    return createBrowserRouter([
      {
        element: <Layout />,
        children: childRoutes,
      },
    ]);
  }, [dealerConfig]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <DealerProvider>
      <AppRouter />
    </DealerProvider>
  );
}
