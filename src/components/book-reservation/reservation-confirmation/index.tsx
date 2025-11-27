import { useDealerContext } from "@core-dir/dealer-provider";

export default function ReservationConfirmation({
  reservationNumber,
}: {
  reservationNumber: string;
}) {
  const { dealerData } = useDealerContext();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Reservation Confirmed!</h2>
          <p className="text-lg text-gray-600 mt-2">
            Thank you for reserving this vehicle.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Reservation Number:</strong>{" "}
            <span className="font-mono text-lg">{reservationNumber}</span>
          </p>
          <p className="text-xs text-green-700 mt-1">
            Please keep this number for your records.
          </p>
        </div>
      </div>

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

        {/* Next Steps */}
        <div className="col-span-1 border-l border-gray-200 pl-6 space-y-4">
          <h3 className="text-lg font-semibold">What Happens Next?</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                1
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Confirmation Email</h4>
                <p className="text-xs text-gray-600">
                  You'll receive a confirmation email with all reservation details within 5 minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                2
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Sales Contact</h4>
                <p className="text-xs text-gray-600">
                  Our sales team will contact you within 2 hours to arrange viewing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                3
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Vehicle Viewing</h4>
                <p className="text-xs text-gray-600">
                  Visit our showroom to inspect and test drive your reserved vehicle.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                4
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Purchase Decision</h4>
                <p className="text-xs text-gray-600">
                  Decide within 48 hours. Your £99 will be deducted from the purchase price.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h4>
            {dealerData?.phoneNumber && (
              <p className="text-xs text-gray-600">
                <strong>Phone:</strong> {dealerData.phoneNumber}
              </p>
            )}
            {dealerData?.email && (
              <p className="text-xs text-gray-600">
                <strong>Email:</strong> {dealerData.email}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Our team is available Monday-Saturday, 9 AM - 6 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}