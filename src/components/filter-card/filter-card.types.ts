export interface FilterCardItems {
  id: string | number;
  name: string;
  media: string;
  fallbackMedia: string;
}

export interface FilterCardProps {
  type?: string;
  filterKey: string;
  item: FilterCardItems;
}
