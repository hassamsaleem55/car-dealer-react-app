export interface FormData {
  registration: string;
  mileage: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  images?: File[];
  appointmentDate: Date | null;
  appointmentTime: string;
}

// export interface VehicleDetails {
//   reg: string;
//   make: string;
//   model: string;
//   derivative: string;
//   year: string;
//   color: string;
//   fuel: string;
//   transmission: string;
//   body: string;
//   image: string;
// }

// Common props for most wizard steps
export interface WizardStepProps {
  vehicleDetails?: any;
  setVehicleDetails?: (details: any) => void;
  formData: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack?: () => void;
  setStep?: (step: number) => void;
}
