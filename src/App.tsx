import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DealerProvider, useDealerContext } from "@core-dir/dealer-provider";
import { PageMetaProvider } from "@core-dir/page-meta-context";
import ErrorBoundary from "@core-dir/ErrorBoundary";
import PageRenderer from "@core-dir/page-renderer";
import Layout from "./Layout";
import { type BaseDealerPage } from "@types-dir/dealer-props";
import PaymentResponse from "./pages/PaymentResponse";

function AppRouter() {
  const { dealerConfig, dealerData } = useDealerContext();

  const router = useMemo(() => {
    if (!dealerConfig || !dealerConfig.pages || !dealerData) return null;
    
    const pages: BaseDealerPage[] = dealerConfig.pages;

    const childRoutes: any = pages
      .filter((page: BaseDealerPage) => {
        // Exclude finance page if dealer has FCANumber
        if (page.pageName === "finance" && !dealerData.FCANumber) {
          return false;
        }
        return true;
      })
      .map((page: BaseDealerPage) => {
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
  }, [dealerConfig?.pages, dealerData?.FCANumber]);

  if (!router) return null;

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <DealerProvider>
        <PageMetaProvider>
          <AppRouter />
        </PageMetaProvider>
      </DealerProvider>
    </ErrorBoundary>
  );
}
