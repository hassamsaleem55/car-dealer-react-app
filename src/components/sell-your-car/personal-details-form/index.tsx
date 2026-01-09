import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import type {
  PersonalDetailsStepProps,
  FormData,
} from "../sell-car-wizard.types";
import { postFormDataApi } from "@core-dir/services/Api.service";
import { useDealerContext } from "@core-dir/dealer-provider";
import Button from "@elements-dir/button";
import Breadcrumb from "../breadcrumbs";
import VehicleDetailsPanel from "../vehicle-details-panel";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({
  label,
  id,
  error,
  className = "",
  required,
  ...props
}: InputProps) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700"
    >
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg sm:rounded-xl block w-full p-2.5 sm:p-3 transition-all outline-none touch-manipulation ${
        error ? "border-red-500" : "focus:border-gray-400 border-gray-200"
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default function PersonalDetailsForm({
  formData,
  updateFormData,
  vehicleDetails,
  updateVehicleDetails,
  onNext,
  onBack,
  setStep,
}: PersonalDetailsStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [loading, setLoading] = useState(false);
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

    updateFormData({
      images: [...existing, ...newFiles],
    });
  };

  const removeImage = (index: number) => {
    if (!formData.images) return;
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    updateFormData({ images: updatedImages });
  };

  const removeAllImages = () => {
    updateFormData({ images: [] });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.address) newErrors.address = "Required";

    // UK phone regex: +44 or 0 followed by 9–10 digits
    const ukPhoneRegex =
      /^(?:\+?44\s?\d{10}|0044\s?\d{10}|07\d{9}|01\d{9}|02\d{9})$/;
    if (
      formData.phone &&
      !ukPhoneRegex.test(formData.phone.replace(/\s+/g, ""))
    ) {
      newErrors.phone = "Invalid UK phone number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function addSellingCustomer() {
    const payload = new FormData();
    payload.append("StockId", formData.stockId?.toString() || "");
    payload.append("FullName", formData.name || "");
    payload.append("EmailAddress", formData.email || "");
    payload.append("PhoneNumber", formData.phone || "");
    payload.append("Address", formData.address || "");
    payload.append("Message", formData.message || "");
    payload.append("ImageType", "SellingStock");

    if (formData.images.length) {
      formData.images.forEach((file) => {
        payload.append("Images", file);
      });
    }
    const response = await postFormDataApi(
      `/stocks/add-selling-customer/${formData.stockId}`,
      payload,
      dealerAuthToken
    );

    updateFormData({ customerId: response.customerId });
    updateVehicleDetails({ retailPrice: response.retailPrice });
  }

  const handleNext = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await addSellingCustomer();
      onNext(); // move to success step
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      formData.images.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      );
    };
  }, [formData.images]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Breadcrumb pageName="Your Personal Details" />
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left: Vehicle Summary */}
        <div className="lg:col-span-1">
          <VehicleDetailsPanel
            formData={formData}
            vehicleDetails={vehicleDetails}
            setStep={setStep}
          />
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-linear-to-br from-white via-blue-50/20 to-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl border border-blue-200/60">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-gray-900">
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Full Name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  error={errors.name}
                  required={true}
                />
                <Input
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  error={errors.phone}
                  required={true}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    error={errors.email}
                    required={true}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      updateFormData({ address: e.target.value })
                    }
                    error={errors.address}
                    required={true}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    Message (Optional)
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg sm:rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 block w-full p-2.5 sm:p-3 outline-none transition-all touch-manipulation"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      updateFormData({ message: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-white via-purple-50/20 to-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl border border-purple-200/60">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-gray-900">
                Upload Photos
              </h3>

              <label className="border-2 border-dashed border-gray-300 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:bg-gray-50 hover:border-primary/50 active:bg-gray-100 transition-all cursor-pointer group block touch-manipulation">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-primary/20 to-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <Upload size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                </div>

                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                  Click or drag photos here
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  JPG, PNG up to 10MB each
                </p>
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
              {formData.images.length ? (
                <>
                  <div className="flex items-center justify-between mt-3 sm:mt-4 md:mt-5 pt-3 sm:pt-4 border-t border-gray-200">
                    <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
                      {formData.images.length} image(s) selected
                    </p>

                    <button
                      type="button"
                      onClick={removeAllImages}
                      className="text-[10px] sm:text-xs font-semibold text-red-600 hover:text-red-700 hover:underline active:text-red-800 transition-colors touch-manipulation"
                    >
                      Remove all
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
                    {formData.images.map((file, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`upload-${index}`}
                          className="h-24 sm:h-28 md:h-32 w-full object-cover"
                        />

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg touch-manipulation"
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

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 justify-end">
            <Button
              variant={loading ? "disabled" : "secondary"}
              btnText="Back"
              clickEvent={onBack}
            />
            <Button
              variant={loading ? "disabled" : "primary"}
              btnText={loading ? "Submitting..." : "Continue"}
              clickEvent={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
