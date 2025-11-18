export interface DealerConfig {
  dealer: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    checkReCheckList: string[];
  };
  navbar: string;
  footer: string;
  pages: DealerPageKeys[];
}

// export interface DealerPageKeys {
//   pageName: string;
//   label: string;
//   title: string;
//   description: string;
//   path: string | null;
//   showInNavbar: boolean;
//   hasSubmenu: boolean;
//   submenuItems: DealerPageKeys[];
//   sections?: DealerSectionKeys[];
// }

interface BaseDealerPage {
  pageName: string;
  label: string;
  title: string;
  description: string;
  path: string | null;
  showInNavbar: boolean;
  sections?: DealerSectionKeys[];
}

/** Parent page with submenu */
interface DealerPageWithSubmenu extends BaseDealerPage {
  hasSubmenu: true;
  path: null; // parent pages do not have paths
  submenuItems: DealerPageChild[];
}

/** Submenu child page (clickable items) */
interface DealerPageChild extends BaseDealerPage {
  hasSubmenu?: false;
  path: string; // submenu children always have a valid path
  submenuItems?: never; // prevents accidental recursion
}

/** Normal standalone page */
interface DealerPageStandalone extends BaseDealerPage {
  hasSubmenu?: false;
  submenuItems?: never;
}

export type DealerPageKeys =
  | DealerPageWithSubmenu
  | DealerPageChild
  | DealerPageStandalone;

export interface DealerSectionKeys {
  isShared: boolean;
  folderName: string;
  variant: string;
  props?: DealerSectionProps;
}

export interface DealerSectionProps {
  title?: string;
  heading?: string;
  subHeading?: string;
  paragraphs?: string[];
  points?: { heading: string; description: string }[];
  mediaLinks?: { type: "image" | "video"; urls: string[] };
  warrantyPlans?: { title: string; description: string; features: string[] }[];
}
