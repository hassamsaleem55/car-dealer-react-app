import { useState, useEffect, useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import Button from "@elements-dir/button";
import { useDealerContext } from "@core-dir/dealer-provider";
import { getCompanyOpeningHours } from "@core-dir/helpers/CompanyInfoProcessor";

export function GetDirectionV1() {
  const { dealerData } = useDealerContext();
  const [userPostcode, setUserPostcode] = useState("");
  const [openingHours, setOpeningHours] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    setOpeningHours(getCompanyOpeningHours(dealerData?.Schedules || []));
  }, []);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleDirectionsFormSubmit = () => {
    if (userPostcode.trim()) {
      const url = `https://www.google.com/maps/dir/${encodeURIComponent(
        userPostcode
      )}/${dealerData.PostCode}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    // Initialize map functionality
    const initMap = () => {
      console.log(
        "Map initialized with coordinates:",
        dealerData.Latiitude,
        dealerData.Longitude
      );
    };

    const timer = setTimeout(initMap, 1500);
    return () => clearTimeout(timer);
  }, [dealerData.Latiitude, dealerData.longitude]);

  return (
    // <section className="bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Left: Dealer Info & Timetable */}
        <div className="bg-white p-8 md:p-10 space-y-6 shadow-lg border border-gray-200 rounded-tl-2xl">
          <div className="flex flex-row border-b border-b-gray-200 pb-4 mb-6 gap-4">
            <div className="grow flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">Vehicle location</h2>
              {dealerData?.FullAddress && (
                <p className="flex items-center text-sm gap-2">
                  <MapPin size={12} className="text-primary" />{" "}
                  {dealerData?.FullAddress}
                </p>
              )}

              {dealerData?.ContactInfo?.PhoneNumber && (
                <p className="flex items-center text-sm gap-2">
                  <Phone size={12} className="text-primary" />{" "}
                  <a href={`tel:${dealerData?.ContactInfo?.PhoneNumber}`}>
                    {dealerData?.ContactInfo?.PhoneNumber}
                  </a>
                </p>
              )}
            </div>
            {/* <div>
            <Button
              variant="secondary"
              btnText="Get Directions"
              btnTextSize="text-xs"
              widthUtilities="w-30"
              paddingUtilities="px-2 py-2"
              clickEvent={handleGetDirections}
            />
          </div> */}
          </div>
          <div className="px-8 text-sm">
            <ul className="space-y-2">
              {Object.entries(openingHours).map(([day, hours]) => (
                <li key={day} className="flex justify-between capitalize">
                  <span>{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-primary/40 rounded-xl px-6 py-4 items-center space-y-4">
            <div className="flex-1">
              <div className="text-xl font-semibold text-primary">
                Get directions
              </div>
              <div className="text-sm">Enter your location</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grow">
                <input
                  type="text"
                  placeholder="Enter Postcode"
                  value={userPostcode}
                  onChange={(e) => setUserPostcode(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                  required
                />
              </div>
              <div>
                <Button
                  variant="secondary"
                  btnText="Go"
                  clickEvent={handleDirectionsFormSubmit}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        {/* <div
            className="flex-1 min-w-[320px] h-96 md:h-full rounded-r-2xl"
            ref={mapRef}
          >
            <iframe
              className="rounded-tr-2xl"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6027.31910334582!2d-0.485736!3d52.130750000000006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877b13468b2dcaf%3A0x9d0931ffcfb72e51!2s84A%20Ford%20End%20Rd%2C%20Bedford%20MK40%204JX%2C%20UK!5e1!3m2!1sen!2sus!4v1762854317878!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> */}
        <div
          className="flex-1 min-w-[320px] h-96 md:h-full rounded-r-2xl"
          ref={mapRef}
        >
          {dealerData?.Latiitude && dealerData?.Longitude && (
            <iframe
              className="rounded-tr-2xl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${dealerData.Latiitude},${dealerData.Longitude}&hl=en&z=15&output=embed`}
            ></iframe>
          )}
        </div>
      </div>
    </div>
    // </section>
  );
}
