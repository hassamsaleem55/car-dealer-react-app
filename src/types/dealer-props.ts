export interface DealerConfig {
  dealer: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    isCarGuruRatingEnabled: boolean;
    checkReCheckList: string[];
  };
  navbar: string;
  footer: string;
  pages: BaseDealerPage[];
}

interface BaseDealerPage {
  pageName: string;
  label: string;
  title: string;
  description: string;
  path: string | null;
  showInNavbar: boolean;
  sections?: DealerSectionKeys[];
}

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
