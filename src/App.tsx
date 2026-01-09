import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DealerProvider, useDealerContext } from "@core-dir/dealer-provider";
import { PageMetaProvider } from "@core-dir/page-meta-context";
import ErrorBoundary from "@core-dir/ErrorBoundary";
import PageRenderer from "@core-dir/page-renderer";
import Layout from "./Layout";
import { type BaseDealerPage } from "@types-dir/dealer-props";
import PaymentResponse from "./pages/PaymentResponse";

function AppRouter() {
  const { dealerConfig, dealerData } = useDealerContext();

  const routes = useMemo(() => {
    if (!dealerConfig?.pages || !dealerData) return null;
    
    const pages: BaseDealerPage[] = dealerConfig.pages;

    return pages
      .filter((page: BaseDealerPage) => {
        // Exclude finance page if dealer doesn't have FCANumber
        if (page.pageName === "finance" && !dealerData.FCANumber) {
          return false;
        }
        return true;
      })
      .map((page: BaseDealerPage) => {
        const isHome = page.path === "/";

        if (isHome) {
          return (
            <Route
              key={page.pageName}
              index
              element={<PageRenderer page={page} />}
            />
          );
        }

        return (
          <Route
            key={page.pageName}
            path={page.path || undefined}
            element={<PageRenderer page={page} />}
          />
        );
      });
  }, [dealerConfig?.pages, dealerData?.FCANumber]);

  if (!routes) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routes}
          <Route path="/Payment/PaymentResponse" element={<PaymentResponse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PageMetaProvider>
        <DealerProvider>
          <AppRouter />
        </DealerProvider>
      </PageMetaProvider>
    </ErrorBoundary>
  );
}
