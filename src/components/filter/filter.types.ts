export interface RawData {
  makes: string[];
  models: string[];
  colours: string[];
  transmissions: string[];
  fuelTypes: string[];
  bodyTypes: string[];
  makeCounts: Record<string, number>;
  modelCounts: Record<string, number>;
  colourCounts: Record<string, number>;
  transmissionCounts: Record<string, number>;
  fuelTypeCounts: Record<string, number>;
  bodyTypeCounts: Record<string, number>;
}

// Define transformed option structure
export interface FilterOption {
  id: number;
  label: string;
  value: string;
  count: number;
}

// Define transformed category structure
export interface FilterCategory {
  filterName: string;
  filterKey: string;
  total: number;
  options: FilterOption[];
}
