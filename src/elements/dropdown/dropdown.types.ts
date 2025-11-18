export interface DropdownOption {
  id: string | number;
  label: string;
  value: string;
}

export interface DropdownFlexibleProps {
  category: string;
  options: DropdownOption[];
  defaultValue?: string | string[];
  onChange?: (value: string[]) => void;
  multiSelect?: boolean;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  searchable?: boolean; // search inside button
  showTags?: boolean; // show selected values as tags
}
