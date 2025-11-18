export interface FilterCardItems {
  id: string | number;
  name: string;
  media: string;
}

export interface FilterCardProps {
  type?: string;
  filterKey: string;
  item: FilterCardItems;
}
