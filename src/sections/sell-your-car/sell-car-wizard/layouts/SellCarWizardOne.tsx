import { useEffect, useState } from "react";

import type { FormData } from "@components-dir/sell-your-car/sell-car-wizard.types";
import CarValuationForm from "@components-dir/sell-your-car/car-valuation-form";
import CarConfirmView from "@components-dir/sell-your-car/car-confirm-view";
import PersonalDetailsForm from "@components-dir/sell-your-car/personal-details-form";
import SetAppointment from "@components-dir/sell-your-car/set-appointment";

export default function SellCarWizardOne() {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    registration: "",
    mileage: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    appointmentDate: null,
    appointmentTime: "",
  });

  const updateData = (newData: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...newData }));
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <>
      {step === 1 && (
        <CarValuationForm
          formData={formData}
          setVehicleDetails={setVehicleDetails}
          updateData={updateData}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <CarConfirmView
          vehicleDetails={vehicleDetails}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <PersonalDetailsForm
          formData={formData}
          vehicleDetails={vehicleDetails}
          updateData={updateData}
          onNext={nextStep}
          onBack={prevStep}
          setStep={setStep}
        />
      )}
      {step === 4 && (
        <SetAppointment
          formData={formData}
          vehicleDetails={vehicleDetails}
          updateData={updateData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {/*   {step === 5 && <Step5Success formData={formData} />} */}
      {/* </main> */}
      {/* </div> */}
    </>
  );
}
