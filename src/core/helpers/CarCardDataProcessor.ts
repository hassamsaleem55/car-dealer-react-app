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
      isReserved: car.isReserved || false,
      specs: [
        sanitizeSpec("Engine", `${car.engineCapacityCC.toLocaleString()} CC`),
        sanitizeSpec("Transmission", car.transmissionType),
        sanitizeSpec("Fuel", car.fuelType),
        sanitizeSpec("Body Type", car.bodyType),
        sanitizeSpec("Mileage", car.odometerReadingMiles?.toLocaleString?.()),
        sanitizeSpec("Color", car.colour),
        sanitizeSpec("Doors", car.aT_StockInfo?.vehicle.doors),
        sanitizeSpec("Seats", car.aT_StockInfo?.vehicle.seats),
        sanitizeSpec("Gears", car.aT_StockInfo?.vehicle.gears),
      ].filter((spec): spec is { label: string; value: any } => spec !== null),
    };
  });

  return carData;
}
