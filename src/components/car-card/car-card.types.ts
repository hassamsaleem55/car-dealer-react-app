export interface Car {
  stockId: number;
  title: string;
  registrationNo: string;
  derivative: string | null;
  description: string | null;
  year: number;
  retailPrice: string;
  priceBeforeDiscount: string | null;
  pricePerMonth: string | null;
  profilePicture: string;
  isReserved: boolean;
  attentionGrabber: string;
  autoTraderRating: string;
  carGuruRating: string;
  specs: { label: string; value: string | number }[];
}
