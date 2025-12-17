import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentResponse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const stockId = searchParams.get("stockId");
  const isSuccessParam = searchParams.get("isSuccess");
  const isSuccess = isSuccessParam === "true";

  const handleBackToVehicleDetail = () => {
    if (stockId) {
      navigate(`/car-details?stockId=${stockId}`);
    } else {
      navigate("/");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Reservation Confirmed
            </h1>

            <p className="text-gray-600 mb-6">
              Thank you! We've received your enquiry and will contact you within
              24 hours to finalize the details.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleBackToVehicleDetail}
                className="w-full border border-primary hover:bg-primary/90 hover:text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Back to Vehicle Details
              </button>
              <button
                onClick={() => navigate("/stock")}
                className="w-full bg-gray-100 hover:bg-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Browse More Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Failure state
  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reservation Failed
          </h1>

          <p className="text-gray-600 mb-6">
            We're sorry, there was an issue processing your reservation. Please
            try again or contact our support team.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleBackToVehicleDetail}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToVehicleDetail}
              className="w-full border border-primary hover:bg-primary/90 hover:text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Back to Vehicle Details
            </button>
            <button
              onClick={() => navigate("/stock")}
              className="w-full bg-gray-100 hover:bg-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Browse Other Vehicles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
