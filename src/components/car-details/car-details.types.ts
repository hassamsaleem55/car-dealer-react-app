export interface Spec {
  label: string;
  value: string;
}

export interface CarDataTypes {
  title: string;
  registrationNo: string;
  derivative?: string;
  description: string;
  retailPrice: string;
  pricePerMonth?: string;
  profilePicture?: string;
  specs?: Spec[];
}
