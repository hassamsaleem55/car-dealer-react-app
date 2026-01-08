import { createContext, useContext, useState, type ReactNode } from "react";

interface PageMeta {
  title?: string;
  description?: string;
}

interface PageMetaContextType {
  pageMeta: PageMeta;
  setPageMeta: (meta: PageMeta) => void;
}

const PageMetaContext = createContext<PageMetaContextType | null>(null);

export function PageMetaProvider({ children }: { children: ReactNode }) {
  const [pageMeta, setPageMeta] = useState<PageMeta>({});

  return (
    <PageMetaContext.Provider value={{ pageMeta, setPageMeta }}>
      {children}
    </PageMetaContext.Provider>
  );
}

export function usePageMeta() {
  const context = useContext(PageMetaContext);
  if (!context) {
    throw new Error("usePageMeta must be used within PageMetaProvider");
  }
  return context;
}
