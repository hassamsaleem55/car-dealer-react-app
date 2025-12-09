declare global {
  interface Window {
    CarGurusScriptLoaded?: boolean;
    CarGurus?: {
      DealRatingBadge?: {
        options?: {
          style?: string;
          minRating?: string;
          defaultHeight?: string;
        };
      };
    };
  }
}

export {};
