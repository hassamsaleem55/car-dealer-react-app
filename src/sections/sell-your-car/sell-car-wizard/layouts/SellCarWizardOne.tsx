import { useEffect, useState } from "react";
import type {
  FormData,
  VehicleDetails,
} from "@components-dir/sell-your-car/sell-car-wizard.types";
import CarValuationForm from "@components-dir/sell-your-car/car-valuation-form";
import CarConfirmView from "@components-dir/sell-your-car/car-confirm-view";
import PersonalDetailsForm from "@components-dir/sell-your-car/personal-details-form";
import SetAppointment from "@components-dir/sell-your-car/set-appointment";
import ConfirmationSuccess from "@components-dir/sell-your-car/confirmation-success";

export default function SellCarWizardOne() {
  const [formData, setFormData] = useState<FormData>({
    regNo: "",
    mileage: "",
    stockId: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    images: [],
    customerId: null,
    scheduleDate: null,
    scheduleTime: "",
    scheduleDayId: null,
  });
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    make: "",
    model: "",
    derivative: "",
    year: null,
    color: "",
    fuel: "",
    transmission: "",
    body: "",
    retailPrice: null,
  });
  const [step, setStep] = useState<number>(1);

  const updateFormData = (newData: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...newData }));
  const updateVehicleDetails = (newData: Partial<VehicleDetails>) =>
    setVehicleDetails((prev) => ({ ...prev, ...newData }));
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Scroll to top on step change
  useEffect(() => {
    console.log("formData:", formData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <>
      {step === 1 && (
        <CarValuationForm
          formData={formData}
          updateFormData={updateFormData}
          updateVehicleDetails={updateVehicleDetails}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <CarConfirmView
          formData={formData}
          vehicleDetails={vehicleDetails}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <PersonalDetailsForm
          formData={formData}
          updateFormData={updateFormData}
          vehicleDetails={vehicleDetails}
          updateVehicleDetails={updateVehicleDetails}
          onNext={nextStep}
          onBack={prevStep}
          setStep={setStep}
        />
      )}
      {step === 4 && (
        <div className="w-full">
          <SetAppointment
            formData={formData}
            updateFormData={updateFormData}
            vehicleDetails={vehicleDetails}
            onNext={nextStep}
            onBack={prevStep}
            setStep={setStep}
          />
        </div>
      )}
      {step === 5 && (
        <div className="w-full">
          <ConfirmationSuccess
            formData={formData}
            vehicleDetails={vehicleDetails}
          />
        </div>
      )}
    </>
  );
}
