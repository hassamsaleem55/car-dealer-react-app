// import { useDealerContext } from "@core-dir/dealer-provider";

// export default function AppointmentConfirmation({
//   selectedDate,
//   selectedTime,
// }: {
//   selectedDate: Date | null;
//   selectedTime: string | null;
// }) {
//   const { dealerData } = useDealerContext();
//   const dayName = selectedDate?.toLocaleDateString("en-US", {
//     weekday: "long",
//   });
//   const dayNumber = selectedDate?.getDate();
//   const monthName = selectedDate?.toLocaleDateString("en-US", {
//     month: "long",
//   });

//   const formattedDate = `${dayName} ${dayNumber}${getOrdinal(
//     dayNumber
//   )} of ${monthName}`;

//   function getOrdinal(day: any) {
//     if (day > 3 && day < 21) return "th"; // 4-20 -> th
//     switch (day % 10) {
//       case 1:
//         return "st";
//       case 2:
//         return "nd";
//       case 3:
//         return "rd";
//       default:
//         return "th";
//     }
//   }
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-medium">Appointment Confirmation</h2>
//       <p className="text-medium">
//         Congratulations, your appointment has been confirmed for
//         <br /> <span className="font-semibold">{formattedDate}</span> at{" "}
//         <span className="font-semibold">{selectedTime}</span>.
//       </p>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <div
//           className="lg:col-span-2 h-96 lg:h-100"
//           // ref={mapRef}
//         >
//           {dealerData?.Latiitude && dealerData?.Longitude && (
//             <iframe
//               className="rounded-tl-2xl"
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               loading="lazy"
//               allowFullScreen
//               referrerPolicy="no-referrer-when-downgrade"
//               src={`https://www.google.com/maps?q=${dealerData.Latiitude},${dealerData.Longitude}&hl=en&z=15&output=embed`}
//             ></iframe>
//           )}
//         </div>
//         <div className="col-span-1 border-l border-gray-200 pl-4 space-y-4">
//           <h2 className="font-semibold">Why Reserve your vehicle?</h2>
//           <ul className="space-y-4">
//             <li className="flex items-start gap-3">
//               <span>
//                 Reserve the car exclusively for you and avoid any
//                 disappointment.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span>
//                 Relax knowing your appointment is confirmed and ready.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span>
//                 Our team ensures the car is prepared and personalised for your
//                 arrival.
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useDealerContext } from "@core-dir/dealer-provider";

function getOrdinal(day: number | undefined) {
  if (!day) return "";
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function AppointmentConfirmation({
  selectedDate,
  selectedTime,
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
}) {
  const { dealerData } = useDealerContext();

  const formattedDate = selectedDate
    ? `${selectedDate.toLocaleDateString("en-US", { weekday: "long" })} ${
        selectedDate.getDate() + getOrdinal(selectedDate.getDate())
      } of ${selectedDate.toLocaleDateString("en-US", { month: "long" })}`
    : "";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Appointment Confirmation</h2>

      <p className="text-base">
        Congratulations, your appointment has been confirmed for{" "}
        <span className="font-semibold">{formattedDate}</span> at{" "}
        <span className="font-semibold">{selectedTime}</span>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 h-96 rounded-tl-2xl overflow-hidden">
          {dealerData?.Latiitude && dealerData?.Longitude && (
            <iframe
              width="100%"
              height="100%"
              className="rounded-tl-2xl"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${dealerData.Latiitude},${dealerData.Longitude}&hl=en&z=15&output=embed`}
            ></iframe>
          )}
        </div>

        {/* Benefits / Why Reserve */}
        <div className="col-span-1 border-l border-gray-200 pl-6 space-y-4">
          <h3 className="text-lg font-semibold">Why Reserve Your Vehicle?</h3>
          <ul className="space-y-3 list-disc list-inside text-base">
            <li>Reserve the car exclusively for you and avoid any disappointment.</li>
            <li>Relax knowing your appointment is confirmed and ready.</li>
            <li>Our team ensures the car is prepared and personalised for your arrival.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
