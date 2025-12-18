// import { useState } from "react";
// import CarValuationFormOne from "@components-dir/car-valuation-form/CarValuationFormOne";

// export default function SellCarWizardOne() {
//   const [stepIndex, setStepIndex] = useState(0);
//   const steps = [
//     {
//       content: <CarValuationFormOne />,
//     },
//     {
//       content: <div>Step 2 Content</div>,
//     },
//     {
//       content: <div>Step 3 Content</div>,
//     },
//   ];
//   return (
//     <div>
//       {steps[stepIndex]?.content}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Car,
  ChevronRight,
  CheckCircle,
  Calendar,
  MapPin,
  Upload,
  // Star,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { postApi } from "@core-dir/services/Api.service";
import { useDealerContext } from "@core-dir/dealer-provider";

// --- Type Definitions ---

interface FormData {
  registration: string;
  mileage: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  appointmentDate: Date | null;
  appointmentTime: string;
}

interface VehicleDetails {
  reg: string;
  make: string;
  model: string;
  derivative: string;
  year: string;
  color: string;
  fuel: string;
  transmission: string;
  body: string;
  image: string;
}

// Common props for most wizard steps
interface WizardStepProps {
  formData: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

// --- Mock Data ---

const MOCK_VEHICLE: VehicleDetails = {
  reg: "SH18YWA",
  make: "AUDI",
  model: "A5",
  derivative: "2.0 TDI S line Sportback 5dr Diesel S Tronic quattro (190 ps)",
  year: "2018",
  color: "Black",
  fuel: "Diesel",
  transmission: "Automatic",
  body: "Hatchback",
  image:
    "https://images.unsplash.com/photo-1603584173870-7b299f589279?auto=format&fit=crop&q=80&w=800",
};

// --- Utility Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  const baseStyle =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    secondary:
      "bg-white text-black border border-gray-200 hover:border-gray-900 hover:bg-gray-50",
    outline:
      "border-2 border-primary text-primary hover:bg-black hover:border-black hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className = "",
  ...props
}) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      id={id}
      className={`bg-gray-50 border text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all outline-none ${
        error ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

// --- Step Components ---

const Step1Entry: React.FC<Omit<WizardStepProps, "onBack">> = ({
  formData,
  updateData,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);
  const { dealerAuthToken } = useDealerContext();

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.registration || !formData.registration) return;

    setLoading(true);
    // Simulate API call
    const fetchData = async () => {
      // try {

      // } catch (error) {
      //   console.log(error);
      // } finally {
      //   setLoading(false);
      // }
      setLoading(true);
      const body = {
        Registration: formData.registration,
        OdometerReadingMiles: formData.mileage,
      };
      const response = await postApi(
        "/stocks/add-selling-stock",
        body,
        dealerAuthToken
      );

      setLoading(false);
      console.log("Stock list response:", response);
      onNext();
    };

    fetchData();
  };

  const handleRegChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateData({
      registration: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <h2 className="text-5xl md:text-7xl font-black text-center uppercase tracking-tighter text-gray-900 mb-4">
        Sell My Car
      </h2>
      <p className="mb-8 text-gray-600 text-lg max-w-lg text-center leading-relaxed">
        <span className="font-bold text-gray-900">Get a free valuation</span>,
        the best offer from our experts, and free home collection with same-day
        payment.
      </p>

      <form
        onSubmit={handleNext}
        className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row gap-2 border border-gray-100"
      >
        {/* Registration Input */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <img className="w-10" src="../images/uk-flag.png" />
          </div>
          <input
            type="text"
            placeholder="ENTER REG"
            maxLength={8}
            className="w-full h-16 pl-14 pr-4 bg-gray-50 rounded-xl text-2xl uppercase font-bold border border-transparent focus:border-primary/70 focus:bg-white outline-none transition-all"
            value={formData.registration}
            onChange={handleRegChange}
          />
        </div>

        {/* Mileage Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-auto h-9 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
          </div>
          <input
            type="number"
            placeholder="Mileage"
            className="w-full h-16 pl-14 pr-4 bg-gray-50 rounded-xl text-2xl uppercase font-bold border border-transparent focus:border-primary/70 focus:bg-white outline-none transition-all"
            value={formData.mileage}
            onChange={(e) => updateData({ mileage: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          variant="outline"
          className="h-16 px-8 text-lg md:w-auto w-full"
        >
          {loading ? "Searching..." : "Value My Car"}
          {!loading && <ChevronRight className="w-5 h-5" />}
        </Button>
      </form>

      {/* Trust Indicators */}
      {/* <div className="flex items-center gap-4 mt-8 opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} fill="currentColor" className="w-5 h-5" />
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-600">
          4.9/5 Average Rating
        </span>
        <span className="h-4 w-px bg-gray-300"></span>
        <span className="text-sm font-medium text-gray-500">
          Trusted by 10,000+ sellers
        </span>
      </div> */}
    </div>
  );
};

const Step2Confirm: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          {/* Placeholder for vehicle image logic */}
          {/* <img
            src={MOCK_VEHICLE.image}
            alt="Car"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
            <h3 className="text-white text-3xl font-bold">
              {MOCK_VEHICLE.make} {MOCK_VEHICLE.model}
            </h3>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-yellow-300 border border-black px-4 py-1 rounded font-mono font-bold text-xl uppercase shadow-sm">
              {MOCK_VEHICLE.reg}
            </span>
            <span className="text-gray-500 text-sm">
              Not your car?{" "}
              <button onClick={onBack} className="text-blue-600 underline">
                Change
              </button>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Year", val: MOCK_VEHICLE.year },
              { label: "Fuel", val: MOCK_VEHICLE.fuel },
              { label: "Trans", val: MOCK_VEHICLE.transmission },
              { label: "Body", val: MOCK_VEHICLE.body },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 p-4 rounded-2xl text-center"
              >
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="block font-bold text-gray-900">
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={onNext} className="flex-1">
              Yes, this is my car
            </Button>
            <Button onClick={onBack} variant="secondary">
              No, search again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step3Details: React.FC<Required<WizardStepProps>> = ({
  formData,
  updateData,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Summary */}
        <div className="md:col-span-1">
          <div className="bg-black text-white p-6 rounded-3xl sticky top-4">
            <div className="mb-4">
              <div className="text-xs text-gray-400 uppercase">Selling</div>
              <div className="font-bold text-xl">
                {MOCK_VEHICLE.make} {MOCK_VEHICLE.model}
              </div>
              <div className="text-gray-400 text-sm mt-1">
                {MOCK_VEHICLE.derivative}
              </div>
            </div>
            <div className="h-px bg-gray-800 my-4"></div>
            <div className="flex items-center gap-3 text-sm text-gray-300 mb-2">
              <Car size={16} /> {formData.mileage} miles
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="bg-yellow-400 text-black px-1 rounded text-xs font-bold">
                {formData.registration}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                id="name"
                value={formData.name}
                onChange={(e) => updateData({ name: e.target.value })}
                error={errors.name}
              />
              <Input
                label="Phone Number"
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                error={errors.phone}
              />
              <div className="md:col-span-2">
                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  error={errors.email}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateData({ address: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full p-3 outline-none"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => updateData({ message: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Upload Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload size={20} />
              </div>
              <p className="text-sm font-medium text-gray-900">
                Click or drag photos here
              </p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={onBack} variant="secondary" className="w-1/3">
              Back
            </Button>
            <Button onClick={handleNext} className="w-2/3">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step4Appointment: React.FC<Required<WizardStepProps>> = ({
  updateData,
  onNext,
  onBack,
}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [dates, setDates] = useState<Date[]>([]);

  // Generate 14 days
  useEffect(() => {
    const arr: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    setDates(arr);
  }, []);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Book Inspection</h2>
          <p className="text-gray-500 mt-1">
            Choose a time for us to inspect your vehicle.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-medium">Estimated Value</p>
          <p className="text-4xl font-black text-gray-900">£18,250</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-6">
        {/* Date Scroller */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mb-6">
          {dates.map((date, idx) => {
            const isSelected = selectedDateIndex === idx;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedDateIndex(idx)}
                className={`shrink-0 w-24 p-3 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-black text-white border-black shadow-lg scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="text-xs opacity-80">
                  {date.toLocaleDateString("en-GB", { weekday: "short" })}
                </div>
                <div className="text-xl font-bold">{date.getDate()}</div>
                <div className="text-xs opacity-80">
                  {date.toLocaleDateString("en-GB", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>

        <div className="h-px bg-gray-100 mb-6"></div>

        {/* Time Slots */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} /> Available Slots
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {timeSlots.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => {
                  updateData({
                    appointmentDate: dates[selectedDateIndex],
                    appointmentTime: time,
                  });
                  onNext();
                }}
                className="py-3 px-2 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm font-medium text-gray-700 hover:text-blue-700 transition-all text-center"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-500 hover:text-black underline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

const Step5Success: React.FC<{ formData: FormData }> = ({ formData }) => {
  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="p-10 md:w-3/5 flex flex-col justify-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">All Done!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your details have been submitted successfully. One of our
            representatives will arrive at the scheduled time.
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="text-blue-600" />
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">
                  Appointment
                </div>
                <div className="font-bold text-gray-900">
                  {formData.appointmentDate?.toLocaleDateString()} at{" "}
                  {formData.appointmentTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" />
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">
                  Location
                </div>
                <div className="font-bold text-gray-900 truncate max-w-[20ch]">
                  {formData.address || "Home Address"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

          <div>
            <h3 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-6">
              Summary
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-500 text-sm block">Name</span>
                <span className="font-medium text-lg">{formData.name}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Email</span>
                <span className="font-medium text-lg break-all">
                  {formData.email}
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">
                  Estimated Offer
                </span>
                <span className="font-bold text-3xl text-white">£18,250</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck size={16} /> Secure submission
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application Component ---

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
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <>
      {/* <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20"> */}
      {/* Header / Nav */}
      {/* <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter">
            CARBUYER<span className="text-blue-600">.</span>
          </div>

          {step > 1 && step < 5 && (
            <div className="hidden md:flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    s <= step ? "w-8 bg-black" : "w-2 bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      </nav> */}

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        {step === 1 && (
          <Step1Entry
            formData={formData}
            updateData={updateData}
            onNext={nextStep}
          />
        )}
        {step === 2 && <Step2Confirm onNext={nextStep} onBack={prevStep} />}
        {step === 3 && (
          <Step3Details
            formData={formData}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
          <Step4Appointment
            formData={formData}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 5 && <Step5Success formData={formData} />}
      </main>
      {/* </div> */}
    </>
  );
}
