export interface Car {
  stockId: number;
  title: string;
  derivative: string | null;
  description: string | null;
  year: number;
  retailPrice: string;
  priceBeforeDiscount: string | null;
  pricePerMonth: string | null;
  profilePicture: string;
  specs: { label: string; value: string | number }[];
}
