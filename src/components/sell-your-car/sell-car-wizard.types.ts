export interface FormData {
  regNo: string;
  mileage: string;
  stockId: number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  images: File[];
  customerId: number | null;
  scheduleDate: Date | null;
  scheduleTime: string;
  scheduleDayId: number | null;
}

export interface VehicleDetails {
  regNo: string;
  mileage: number;
  make: string;
  model: string;
  derivative: string;
  year: number | null;
  color: string;
  fuel: string;
  transmission: string;
  body: string;
  retailPrice: number;
}

export interface CarValuationStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  updateVehicleDetails: (data: Partial<VehicleDetails>) => void;
  onNext: () => void;
}

export interface CarConfirmStepProps {
  vehicleDetails: VehicleDetails;
  onNext: () => void;
  onBack: () => void;
}

export interface PersonalDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  vehicleDetails: VehicleDetails;
  updateVehicleDetails: (data: Partial<VehicleDetails>) => void;
  onNext: () => void;
  onBack: () => void;
  setStep: (step: number) => void;
}

export interface SetAppointmentStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  vehicleDetails: VehicleDetails;
  onNext: () => void;
  onBack: () => void;
  setStep: (step: number) => void;
}
