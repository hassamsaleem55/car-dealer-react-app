import { createPortal } from "react-dom";
import { useState } from "react";
import { Toaster, toast } from "sonner";
// import { useDealerContext } from "@core-dir/dealer-provider";
// import { fetchApi } from "@core-dir/services/Api.service";
import { Step1, Step2, Step3 } from "@components-dir/book-appointment";

export default function AppointmentModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  // const { dealerAuthToken } = useDealerContext();
  const [step, setStep] = useState(1); // Track current step
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentForm, setAppointmentForm] = useState([
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      value: "",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      value: "",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
      required: true,
      value: "",
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      required: true,
      value: "",
    },
  ]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !selectedTime) {
      toast.error("Please select a time before proceeding.");
      return;
    }

    if (step === 2) {
      if (!formValidated()) {
        return;
      }
      
      // async () => {
      //   const response = await fetchApi(
      //     "/api/companies/schedule",
      //     dealerAuthToken
      //   );
      // };
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        );
      case 2:
        return (
          <Step2
            appointmentForm={appointmentForm}
            setAppointmentForm={setAppointmentForm}
          />
        );
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  const formValidated = (): boolean => {
    const emptyField = appointmentForm.find(
      (field) => field.required && !field.value.trim()
    );
    if (emptyField) {
      toast.error(`Please fill out the ${emptyField.label} field.`);
      return false;
    }

    // Validate email
    const emailField = appointmentForm.find((f) => f.name === "email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRegex.test(emailField.value)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Validate UK phone number
    const phoneField = appointmentForm.find((f) => f.name === "phone");
    // UK phone regex: +44 or 0 followed by 9–10 digits
    const ukPhoneRegex =
      /^(?:\+?44\s?\d{10}|0044\s?\d{10}|07\d{9}|01\d{9}|02\d{9})$/;
    if (
      phoneField &&
      !ukPhoneRegex.test(phoneField.value.replace(/\s+/g, ""))
    ) {
      toast.error("Please enter a valid UK phone number.");
      return false;
    }

    return true;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center"
      onClick={() => setIsOpen(false)} // Click on backdrop closes modal
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-7xl overflow-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Set Appointment</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-col-1 lg:grid-cols-12 p-4 sm:p-6 gap-6">
          <div className="col-span-3">
            {/* Car Image */}
            <div className="relative">
              <div className="rounded-md shadow-sm h-[200px] flex flex-col items-center justify-center bg-sky-500 object-center w-full booking-awaiting-img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={36}
                  height={36}
                  color="#ffffff"
                  fill="none"
                >
                  <defs />
                  <path
                    fill="currentColor"
                    d="M15.75,22.75 L15.75,22.751 L15.75,22.75 L6.8,22.75 C4.884,22.75 3.325,21.379 3.251,19.628 C3.167,17.354 4.679,16.073 6.015,14.942 L6.015,14.942 L6.017,14.941 L6.017,14.94 C7.626,13.587 8.514,12.839 8.593,12.165 C8.6,12.055 8.6,11.945 8.593,11.835 C8.514,11.162 7.625,10.414 6.021,9.063 L6.018,9.061 C4.879,8.094 3.163,6.635 3.251,4.375 C3.325,2.622 4.884,1.25 6.8,1.25 L17.201,1.25 C19.117,1.25 20.676,2.621 20.75,4.372 C20.836,6.652 19.256,7.986 17.985,9.059 L17.983,9.06 C16.375,10.413 15.486,11.162 15.408,11.835 C15.401,11.945 15.401,12.055 15.408,12.165 C15.486,12.838 16.376,13.586 17.98,14.937 L17.983,14.939 C18.144,15.076 18.304,15.21 18.464,15.344 L18.48,15.358 L18.527,15.397 C18.759,15.591 18.997,15.791 19.233,15.995 C20.249,16.898 20.799,18.219 20.75,19.623 C20.676,21.379 19.117,22.75 17.199,22.75 Z M15.746,21.251 L17.199,21.251 C18.327,21.251 19.209,20.526 19.25,19.565 C19.285,18.614 18.917,17.721 18.242,17.121 C18.022,16.93 17.788,16.733 17.56,16.543 L17.52,16.509 C17.351,16.368 17.181,16.226 17.014,16.084 L17.01,16.081 C15.099,14.473 14.044,13.585 13.913,12.305 L13.911,12.277 C13.899,12.093 13.899,11.905 13.911,11.721 L13.913,11.693 C14.045,10.413 15.101,9.524 17.017,7.912 C18.4,6.744 19.305,5.87 19.25,4.431 C19.209,3.473 18.327,2.749 17.199,2.749 L6.8,2.749 L6.8,2.75 C5.672,2.75 4.791,3.475 4.75,4.436 C4.695,5.85 5.729,6.848 6.985,7.916 C8.899,9.526 9.954,10.415 10.085,11.695 L10.087,11.723 C10.099,11.907 10.099,12.095 10.087,12.279 L10.085,12.307 C9.954,13.587 8.899,14.476 6.983,16.088 C5.558,17.294 4.696,18.131 4.75,19.569 C4.79,20.526 5.672,21.251 6.8,21.251 L8.254,21.251 C8.263,20.965 8.293,20.733 8.396,20.498 C8.409,20.464 8.423,20.436 8.433,20.416 L8.446,20.374 L8.488,20.306 C8.676,19.993 8.937,19.805 9.333,19.519 L9.337,19.516 L9.37,19.493 C10.443,18.729 11.033,18.309 11.819,18.256 C11.934,18.249 12.066,18.249 12.177,18.256 C12.967,18.309 13.558,18.729 14.628,19.491 L14.63,19.493 L14.655,19.51 L14.656,19.511 C15.061,19.802 15.324,19.991 15.512,20.306 L15.554,20.374 L15.568,20.416 C15.578,20.438 15.592,20.466 15.604,20.498 C15.707,20.733 15.737,20.964 15.746,21.251 Z M14.247,21.25 C14.243,21.177 14.238,21.121 14.231,21.097 L14.212,21.059 C14.157,21 13.989,20.878 13.819,20.756 C13.809,20.748 13.798,20.741 13.788,20.733 L13.762,20.714 C12.825,20.047 12.431,19.775 12.08,19.752 C12.035,19.749 11.967,19.749 11.917,19.752 C11.571,19.775 11.177,20.047 10.241,20.714 L10.217,20.731 L10.214,20.733 C10.033,20.863 9.849,20.995 9.791,21.058 L9.771,21.098 C9.763,21.121 9.758,21.176 9.755,21.249 L9.754,21.25 Z"
                  />
                </svg>
                <h3 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Awaiting Image
                </h3>
              </div>
              <div className="bg-white py-2">
                <h3 className="text-base font-bold leading-tight tracking-tight text-gray-900">
                  Nissan X-Trail
                </h3>
                <p className="text-xs font-medium leading-[13px]">
                  1.6 dCi n-tec SUV 5dr Diesel XTRON Euro 5 (s/s) (130 ps)
                </p>
              </div>
            </div>
            {/* Specifications */}
            <div className="flex items-center flex-wrap gap-[5px] mb-2">
              <span className="vehicleCardSpan text-xs" title="Total Price">
                £12,500
              </span>
              {/* Fuel Type*/}
              <span className="vehicleCardSpan text-xs" title="Fuel Type">
                Diesel
              </span>
              {/* Engine Size */}
              <span className="vehicleCardSpan text-xs" title="Engine Size">
                1598 CC
              </span>
              {/* Mileage */}
              <span className="vehicleCardSpan text-xs" title="Mileage">
                59,001 m
              </span>
              {/* Transmission */}
              <span className="vehicleCardSpan text-xs" title="Transmission">
                Automatic
              </span>
              {/* Doors */}
              <span className="vehicleCardSpan text-xs" title="Total Doors">
                4 Doors
              </span>
              {/* Color */}
              <span className="px-2 vehicleCardSpan text-xs" title="Color">
                Grey
              </span>
            </div>
            <div className="mb-2">
              <h2 className="font-bold text-lg mb-2">Appointment Info</h2>
              <p className="text-sm text-gray-600 mb-2">
                Estimated Time: 30 - 60 minutes
              </p>
              <p className="text-xs text-gray-500">
                Your appointment is set to take place at our main showroom. Once
                everything is confirmed, we’ll send you an email with directions
                and helpful info to make your visit simple and stress-free.
                <br />
                <br />
                If you need to move your appointment, just let us know at least
                24 hours in advance and we’ll be glad to arrange a new time for
                you.
              </p>
            </div>
            {/* </div> */}
          </div>
          <div className="col-span-9 rounded-l-lg">{renderStepContent()}</div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 py-2 rounded bg-gray-200 disabled:opacity-50 ${
              step !== 1 ? "cursor-pointer hover:bg-gray-300" : ""
            }`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={step === 3}
            className={`px-4 py-2 rounded bg-primary text-white disabled:opacity-50 ${
              step !== 3 ? "cursor-pointer hover:bg-primary/90" : ""
            }`}
          >
            {step === 1 ? "Next" : step === 2 ? "Submit" : "Finish"}
          </button>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>,
    document.body
  );
}
