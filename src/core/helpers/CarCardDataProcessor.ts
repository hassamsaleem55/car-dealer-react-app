import { type Car } from "@components-dir/car-card/car-card.types";

export function processCarCardData(rawData: any[]): any[] {
  const sanitizeText = (value: any) => {
    if (!value || typeof value !== "string" || value.trim() === "") return null;
    return value.trim();
  };

  const sanitizeSpec = (label: string, value: any) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return null;
    }
    return { label, value };
  };

  const carData: Car[] = rawData.map((car) => {
    return {
      stockId: car.stockId,
      title: `${car.make} ${car.model}`,
      derivative: sanitizeText(car.derivative),
      description: sanitizeText(car.description),
      registrationNo: car.registration,
      year: new Date(car.registrationDate).getFullYear(),
      retailPrice: `£${car.retailPrice.toLocaleString()}`,
      priceBeforeDiscount: car.priceBeforeDiscount
        ? `£${car.priceBeforeDiscount.toLocaleString()}`
        : null,
      pricePerMonth: car.financePerMonth
        ? `£${car.financePerMonth.toLocaleString()}`
        : null,
      profilePicture: car.profilePicture || "images/awaiting-image-alfa.png",
      specs: [
        sanitizeSpec("Engine Capacity", car.engineCapacityCC),
        sanitizeSpec("Transmission", car.transmissionType),
        sanitizeSpec("Fuel", car.fuelType),
        sanitizeSpec("Body Type", car.bodyType),
        sanitizeSpec(
          "Mileage",
          car.odometerReadingMiles?.toLocaleString?.() ?? null
        ),
        sanitizeSpec("Doors", car.doors),
        sanitizeSpec("Color", car.colour),
        sanitizeSpec(
          "MOT Date",
          car.motDue ? new Date(car.motDue).toLocaleDateString() : null
        ),
      ].filter((spec): spec is { label: string; value: any } => spec !== null),
    };
  });

  return carData;
}
