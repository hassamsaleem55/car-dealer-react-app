// import { CheckCircle } from "lucide-react";
// import Button from "@elements-dir/button";
// import Breadcrumb from "../breadcrumbs";
// import type { FormData } from "../sell-car-wizard.types";

// export default function ConfirmationSuccess({
//   formData,
//   vehicleDetails,
// }: {
//   formData: FormData;
//   vehicleDetails: any;
// }) {
//   const formatDate = (date: Date | null) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <Breadcrumb pageName="Confirmation" />
//       <div className="min-w-4xl rounded-3xl bg-white shadow-xl border border-primary overflow-hidden">
//         <div className="p-8 flex flex-col gap-2">
//           {/* Success Icon & Header */}
//           <div className="flex flex-col items-center text-center mb-4">
//             <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
//               <CheckCircle className="w-10 h-10 text-green-600" />
//             </div>
//             <h3 className="text-3xl font-bold">Thank You!</h3>
//             <p className="text-base text-gray-600 mt-1">
//               Your submission has been received successfully.
//             </p>
//           </div>

//           {/* Vehicle Details Card */}
//           <div className="bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md p-6">
//             <h4 className="text-lg font-bold text-gray-900 mb-3">
//               Vehicle Details
//             </h4>
//             <div className="">
//               <h3 className="text-2xl font-bold">
//                 {vehicleDetails?.make} {vehicleDetails?.model}
//               </h3>
//               <p className="text-sm text-gray-500 mb-3">
//                 {vehicleDetails?.derivative}
//               </p>
//             </div>
//             <div className="flex items-center gap-4 mb-4">
//               <span className="inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-xl uppercase bg-linear-to-r from-primary/15 to-primary/5 text-primary border border-primary/30 shadow-sm">
//                 {vehicleDetails?.registration || formData.registration}
//               </span>
//               <span className="text-sm text-gray-600">
//                 {formData.mileage.toLocaleString()} miles
//               </span>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//               {[
//                 {
//                   icon: "Year",
//                   value: vehicleDetails?.firstRegistrationDate
//                     ? new Date(vehicleDetails.firstRegistrationDate).getFullYear()
//                     : "N/A",
//                 },
//                 { icon: "Fuel", value: vehicleDetails?.fuelType || "N/A" },
//                 { icon: "Trans", value: vehicleDetails?.transmissionType || "N/A" },
//                 { icon: "Body", value: vehicleDetails?.bodyType || "N/A" },
//                 { icon: "Color", value: vehicleDetails?.colour || "N/A" },
//               ].map((spec, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center px-2 py-2 group"
//                 >
//                   <div className="flex justify-center mb-1 text-gray-500 group-hover:text-primary transition-colors">
//                     {spec.icon}
//                   </div>
//                   <p className="text-xs font-bold text-gray-800">{spec.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Details Card */}
//           <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-md p-4">
//             <h4 className="text-lg font-bold text-gray-900 mb-3">
//               Contact Details
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//               <div>
//                 <span className="text-gray-600 block mb-1">Name</span>
//                 <span className="font-semibold text-gray-900">
//                   {formData.name}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-gray-600 block mb-1">Email</span>
//                 <span className="font-semibold text-gray-900 break-all">
//                   {formData.email}
//                 </span>
//               </div>
//               <div>
//                 <span className="text-gray-600 block mb-1">Phone</span>
//                 <span className="font-semibold text-gray-900">
//                   {formData.phone}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Appointment Details Card (if set) */}
//           {formData.appointmentDate && formData.appointmentTime && (
//             <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/30 shadow-md p-4">
//               <h4 className="text-lg font-bold text-gray-900 mb-3">
//                 Appointment Scheduled
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <span className="text-gray-700 block mb-1">Date</span>
//                   <span className="font-bold text-gray-900">
//                     {formatDate(formData.appointmentDate)}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="text-gray-700 block mb-1">Time</span>
//                   <span className="font-bold text-primary">
//                     {formData.appointmentTime}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* What's Next Card */}
//           <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-4">
//             <h4 className="text-lg font-bold text-gray-900 mb-3">
//               What's Next?
//             </h4>
//             <ul className="space-y-2 text-sm text-gray-700">
//               <li className="flex items-start">
//                 <span className="inline-block w-5 h-5 rounded-full bg-blue-600 text-white text-center font-bold text-xs mr-2 mt-0.5 shrink-0 leading-5">
//                   1
//                 </span>
//                 <span>We'll review your vehicle and prepare a valuation.</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="inline-block w-5 h-5 rounded-full bg-blue-600 text-white text-center font-bold text-xs mr-2 mt-0.5 shrink-0 leading-5">
//                   2
//                 </span>
//                 <span>You'll receive our offer within 24 hours.</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="inline-block w-5 h-5 rounded-full bg-blue-600 text-white text-center font-bold text-xs mr-2 mt-0.5 shrink-0 leading-5">
//                   3
//                 </span>
//                 <span>
//                   {formData.appointmentDate
//                     ? "See you at your appointment!"
//                     : "We'll arrange an appointment to complete the sale."}
//                 </span>
//               </li>
//             </ul>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col md:flex-row gap-4">
//             <Button
//               variant="secondary"
//               btnText="Back to Home"
//               clickEvent={() => (window.location.href = "/")}
//             />
//             <Button
//               variant="primary"
//               btnText="View Our Stock"
//               clickEvent={() => (window.location.href = "/stock")}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { CheckCircle, Calendar, Mail, Phone, User, Clock } from "lucide-react";
import Button from "@elements-dir/button";
import Breadcrumb from "../breadcrumbs";
import type { FormData } from "../sell-car-wizard.types";

export default function ConfirmationSuccess({
  formData,
  vehicleDetails,
}: {
  formData: FormData;
  vehicleDetails: any;
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
          <div className="rounded-2xl bg-linear-to-br from-white via-gray-50/50 to-white shadow-2xl border border-gray-200/60 overflow-hidden h-full">
            <div className="p-6 flex flex-col gap-4">
              {/* Vehicle Header */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Your Vehicle
                </h4>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {vehicleDetails?.make} {vehicleDetails?.model}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {vehicleDetails?.derivative}
                </p>
              </div>

              {/* Registration & Mileage */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-lg font-bold text-lg uppercase bg-linear-to-r from-primary/20 via-primary/10 to-primary/5 text-primary border-2 border-primary/40 shadow-md">
                  {vehicleDetails?.registration}
                </span>
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-center">
                  <p className="text-xs text-gray-500 font-medium">Mileage</p>
                  <p className="text-sm font-bold text-gray-900">
                    {formData.mileage.toLocaleString()} mi
                  </p>
                </div>
              </div>

              {/* Estimated Price */}
              <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 p-5 shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                <p className="text-xs text-gray-700 font-semibold uppercase tracking-wider mb-1 relative z-10">
                  Estimated Value
                </p>
                <p className="text-3xl font-bold text-primary relative z-10">
                  £{vehicleDetails?.retailPrice?.toLocaleString() || "N/A"}
                </p>
              </div>

              {/* Vehicle Specs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Year",
                    value: vehicleDetails?.firstRegistrationDate
                      ? new Date(
                          vehicleDetails.firstRegistrationDate
                        ).getFullYear()
                      : "N/A",
                  },
                  { label: "Fuel", value: vehicleDetails?.fuelType || "N/A" },
                  {
                    label: "Trans",
                    value: vehicleDetails?.transmissionType || "N/A",
                  },
                  { label: "Body", value: vehicleDetails?.bodyType || "N/A" },
                  { label: "Color", value: vehicleDetails?.colour || "N/A" },
                ].map((spec, idx) => (
                  <div
                    key={idx}
                    className={`${
                      idx >= 3 ? "col-span-1" : ""
                    } bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center p-3 group`}
                  >
                    <p className="text-[10px] text-gray-500 font-medium mb-1 group-hover:text-primary transition-colors">
                      {spec.label}
                    </p>
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              <div className="bg-linear-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl shadow-sm p-5 flex-1">
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
              </div>

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
