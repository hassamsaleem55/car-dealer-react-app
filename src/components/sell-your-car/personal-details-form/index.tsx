import { useEffect, useState } from "react";
import type { WizardStepProps, FormData } from "../sell-car-wizard.types";
// import { Car, Upload } from "lucide-react";
import { Upload } from "lucide-react";
import Button from "@elements-dir/button";
import { postFormDataApi } from "@core-dir/services/Api.service";
import { useDealerContext } from "@core-dir/dealer-provider";

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

export default function PersonalDetailsForm({
  vehicleDetails,
  formData,
  updateData,
  onNext,
  onBack,
  setStep,
}: WizardStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const { dealerAuthToken } = useDealerContext();
  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;

    const existing = formData.images || [];
    const newFiles = Array.from(files).filter(
      (file) =>
        !existing.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
    );

    updateData({
      images: [...existing, ...newFiles],
    });
  };

  const removeImage = (index: number) => {
    if (!formData.images) return;
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    updateData({ images: updatedImages });
  };

  const removeAllImages = () => {
    updateData({ images: [] });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function addSellingCustomer({
    stockId,
    formData,
  }: {
    stockId: number;
    formData: FormData;
  }) {
    const payload = new FormData();
    payload.append("StockId", stockId.toString());
    payload.append("FullName", formData.name || "");
    payload.append("EmailAddress", formData.email || "");
    payload.append("PhoneNumber", formData.phone || "");
    payload.append("Address", formData.address || "");
    payload.append("Message", formData.message || "");
    payload.append("ImageType", "SellingStock");

    if (formData.images?.length) {
      formData.images.forEach((file) => {
        payload.append("Images", file);
      });
    }
    const response = await postFormDataApi(
      `/stocks/add-selling-customer/${stockId}`,
      payload,
      dealerAuthToken
    );

    console.log("addSellingCustomer response:", response);
  }

  const handleNext = async () => {
    if (!validate()) return;

    try {
      await addSellingCustomer({
        stockId: vehicleDetails.stockId,
        formData,
      });

      onNext(); // move to success step
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the form");
    }
  };

  useEffect(() => {
    return () => {
      formData.images?.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      );
    };
  }, [formData.images]);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* <div className="p-12 flex flex-col items-center justify-center gap-2">
        <h2 className="text-5xl md:text-7xl font-black text-center uppercase tracking-tighter text-gray-900 mb-4">
          Sell My Car
        </h2>
        <p className="mb-8 text-gray-600 text-lg max-w-lg text-center leading-relaxed">
          <span className="font-bold text-gray-900">Get a free valuation</span>,
          the best offer from our experts, and free home collection with
          same-day payment.
        </p>
      </div> */}
      {/* Left: Summary */}
      <div className="md:col-span-1">
        <div className="rounded-3xl bg-white shadow-xl border border-primary overflow-hidden">
          <div className="p-8 flex flex-col gap-2">
            <div>
              <h3 className="text-3xl font-bold">
                {vehicleDetails?.make} {vehicleDetails?.model}
              </h3>
              <p className="text-base text-gray-500">
                {vehicleDetails?.derivative}
              </p>
            </div>
            <div className="flex items-center gap-4 mb-6">
              {/* <span className="bg-yellow-300 border border-black px-4 py-1 rounded font-mono font-bold text-xl uppercase shadow-sm"> */}
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-xl uppercase bg-linear-to-r from-primary/15 to-primary/5 text-primary border border-primary/30 shadow-sm">
                {vehicleDetails?.registration}
              </span>
              <span className="text-sm text-bold">
                Not your car?{" "}
                <button
                  onClick={() => setStep && setStep(1)}
                  className="text-primary underline"
                >
                  Change
                </button>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "Year",
                  value: new Date(
                    vehicleDetails?.firstRegistrationDate
                  ).getFullYear(),
                },
                { icon: "Fuel", value: vehicleDetails?.fuelType },
                { icon: "Trans", value: vehicleDetails?.transmissionType },
                { icon: "Body", value: vehicleDetails?.bodyType },
                { icon: "Color", value: vehicleDetails?.colour },
              ].map((spec, idx) => (
                <div
                  key={idx}
                  className="bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 text-center px-2 py-2 group"
                >
                  <div className="flex justify-center mb-1 text-gray-500 group-hover:text-primary transition-colors">
                    {spec.icon}
                  </div>
                  <p className="text-xs font-bold text-gray-800">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="md:col-span-2">
        <div className="grid grid-cols-2 gap-6">
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

            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group block">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload size={20} />
              </div>

              <p className="text-sm font-medium text-gray-900">
                Click or drag photos here
              </p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => {
                  handleImagesChange(e.target.files);
                  e.currentTarget.value = ""; // 👈 RESET
                }}
              />
            </label>

            {/* Image Preview Grid */}
            {formData.images?.length ? (
              <>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-600">
                    {formData.images.length} image(s) selected
                  </p>

                  <button
                    type="button"
                    onClick={removeAllImages}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove all
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`upload-${index}`}
                        className="h-28 w-full object-cover"
                      />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex w-sm gap-4 pt-4 ml-auto">
          <Button variant="secondary" btnText="Back" clickEvent={onBack} />
          <Button
            variant="primary"
            btnText="Continue"
            clickEvent={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
