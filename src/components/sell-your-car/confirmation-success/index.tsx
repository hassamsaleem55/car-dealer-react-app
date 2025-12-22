import { CheckCircle, Calendar, Mail, Phone, User, Clock } from "lucide-react";
import type { FormData, VehicleDetails } from "../sell-car-wizard.types";
import Button from "@elements-dir/button";
import Breadcrumb from "../breadcrumbs";
import VehicleDetailsPanel from "../vehicle-details-panel";

export default function ConfirmationSuccess({
  formData,
  vehicleDetails,
}: {
  formData: FormData;
  vehicleDetails: VehicleDetails;
}) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb pageName="Confirmation" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Vehicle Summary */}
        <div className="lg:col-span-1">
          <VehicleDetailsPanel
            formData={formData}
            vehicleDetails={vehicleDetails}
          />
        </div>

        {/* Middle: Contact & Success */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-linear-to-br from-white via-green-50/30 to-white shadow-2xl border border-green-200/60 overflow-hidden h-full">
            <div className="p-6 flex flex-col gap-5">
              {/* Success Icon & Header */}
              <div className="flex flex-col items-center text-center pb-4 border-b border-green-200">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl"></div>
                  <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                    <CheckCircle
                      className="w-11 h-11 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">
                  Submission Successful!
                </h3>
                <p className="text-sm text-gray-600 mt-1 max-w-xs">
                  Thank you for choosing us. We've received your details and
                  will be in touch soon.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Your Contact Information
                </h4>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">
                        Full Name
                      </p>
                      <p className="font-semibold text-gray-900 truncate">
                        {formData.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">
                        Email Address
                      </p>
                      <p className="font-semibold text-gray-900 truncate text-sm">
                        {formData.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">
                        Phone Number
                      </p>
                      <p className="font-semibold text-gray-900">
                        {formData.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Appointment & Next Steps */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-linear-to-br from-white via-blue-50/30 to-white shadow-2xl border border-blue-200/60 overflow-hidden h-full">
            <div className="p-6 flex flex-col gap-5">
              {/* Appointment Details */}
              {formData.scheduleDate && formData.scheduleTime ? (
                <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-xl border-2 border-primary/30 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900">
                      Appointment Scheduled
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
                      <Calendar className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">
                          Date
                        </p>
                        <p className="font-bold text-gray-900 text-sm">
                          {formatDate(formData.scheduleDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
                      <Clock className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">
                          Time
                        </p>
                        <p className="font-bold text-primary text-base">
                          {formData.scheduleTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm p-5 text-center">
                  <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">
                    No appointment scheduled yet
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll contact you to arrange one
                  </p>
                </div>
              )}

              {/* What's Next */}
              {/* <div className="bg-linear-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl shadow-sm p-5 flex-1">
                <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    →
                  </span>
                  What Happens Next?
                </h4>
                <ul className="space-y-3">
                  {[
                    "We'll review your vehicle and prepare a comprehensive valuation",
                    "You'll receive our competitive offer within 24 hours",
                    formData.scheduleDate
                      ? "See you at your scheduled appointment!"
                      : "We'll arrange a convenient appointment to complete the sale",
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed flex-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  variant="primary"
                  btnText="Browse Our Stock"
                  clickEvent={() => (window.location.href = "/stock")}
                />
                <Button
                  variant="secondary"
                  btnText="Return Home"
                  clickEvent={() => (window.location.href = "/")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
