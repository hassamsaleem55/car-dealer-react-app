import React from "react";
import { type Car } from "@components-dir/car-card/car-card.types";
import {
  EngineSvg,
  TransmissionSvg,
  FuelSvg,
  BodyTypeSvg,
  MileageSvg,
  ColorSvg,
} from "@core-dir/svgs";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface CarGurusVehicle {
  vrn: string;
  price: number;
}

interface CarGurusRating {
  vrn: string;
  deal_rating_value: string;
}

interface CarGurusApiResponse {
  success: boolean;
  results?: CarGurusRating[];
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Sanitizes text values by trimming whitespace and returning null for empty values
 */
const sanitizeText = (value: any): string | null => {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  return value.trim();
};

/**
 * Creates a spec object if the value is valid, otherwise returns null
 */
const sanitizeSpec = (
  key: string,
  icon: React.JSX.Element,
  value: any
): { key: string; icon: React.JSX.Element; value: any } | null => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }
  return { key, icon, value };
};

/**
 * Formats a number as GBP currency string
 */
const formatPrice = (price: number): string => `£${price.toLocaleString()}`;

/**
 * Extracts year from registration date string
 */
const extractYear = (registrationDate: string): number =>
  new Date(registrationDate).getFullYear();

// ============================================
// CARGURUS API INTEGRATION
// ============================================

/**
 * Fetches CarGurus price ratings for multiple vehicles
 */
async function fetchCarGurusRatings(
  vehicles: CarGurusVehicle[]
): Promise<CarGurusRating[]> {
  if (vehicles.length === 0) return [];

  const formdata = new FormData();
  formdata.append("vins", JSON.stringify(vehicles));

  try {
    const response = await fetch(
      "https://www.cargurus.co.uk/Cars/api/1.0/dealRatingRequest.action",
      { method: "POST", body: formdata }
    );

    const result = await response.text();
    const apiResponse: CarGurusApiResponse = JSON.parse(result);

    if (apiResponse.success && apiResponse.results) {
      return apiResponse.results;
    } else {
      console.error("[CarGurus] Unsuccessful API response:", apiResponse);
      return [];
    }
  } catch (error) {
    console.error("[CarGurus] API request failed:", error);
    return [];
  }
}

/**
 * Finds and formats CarGurus rating for a specific vehicle
 */
const getCarGurusRating = (
  registration: string,
  carGurusData: CarGurusRating[]
): string => {
  const rating = carGurusData.find((cg) => cg.vrn === registration);

  if (!rating?.deal_rating_value) return "";

  // Extract first part of rating (e.g., "GREAT_PRICE" -> "great")
  return rating.deal_rating_value.split("_")[0].toLowerCase();
};

// ============================================
// CAR SPECS BUILDER
// ============================================

/**
 * Builds the specs array for a car from raw data
 */
const buildCarSpecs = (
  car: any
): { key: string; icon: React.JSX.Element; value: any }[] => {
  const specs = [
    sanitizeSpec("Body Type", <BodyTypeSvg />, car.bodyType),
    sanitizeSpec(
      "Engine",
      <EngineSvg />,
      `${car.engineCapacityCC.toLocaleString()} CC`
    ),
    sanitizeSpec("Fuel", <FuelSvg />, car.fuelType),
    sanitizeSpec("Transmission", <TransmissionSvg />, car.transmissionType),
    sanitizeSpec(
      "Mileage",
      <MileageSvg />,
      `${car.odometerReadingMiles?.toLocaleString?.()} miles`
    ),
    sanitizeSpec("Color", <ColorSvg />, car.colour),
  ];

  return specs.filter(
    (spec): spec is { key: string; icon: React.JSX.Element; value: any } =>
      spec !== null
  );
};

// ============================================
// MAIN PROCESSING FUNCTION
// ============================================

/**
 * Processes raw car data from API and enriches it with CarGurus ratings
 * @param rawData - Array of raw car objects from API
 * @returns Promise of processed Car array with formatted data and ratings
 */
export async function processCarCardData(rawData: any[]): Promise<Car[]> {
  if (!rawData || rawData.length === 0) return [];

  // Prepare vehicle list for CarGurus API
  const carGurusVehicles: CarGurusVehicle[] = rawData.map((car) => ({
    vrn: car.registration,
    price: car.retailPrice,
  }));

  // Fetch CarGurus ratings in parallel with data processing setup
  const carGurusRatings = await fetchCarGurusRatings(carGurusVehicles);

  // Transform raw data into Car objects
  const processedCars: Car[] = rawData.map((car) => ({
    stockId: car.stockId,
    title: `${car.make} ${car.model}`,
    derivative: sanitizeText(car.derivative),
    description: sanitizeText(car.description),
    registrationNo: car.registration,
    year: extractYear(car.registrationDate),
    retailPrice: formatPrice(car.retailPrice),
    priceBeforeDiscount: car.priceBeforeDiscount
      ? formatPrice(car.priceBeforeDiscount)
      : null,
    pricePerMonth: car.financePerMonth
      ? formatPrice(car.financePerMonth)
      : null,
    profilePicture: car.profilePicture || "images/awaiting-image-alfa.png",
    isReserved: car.isReserved || false,
    attentionGrabber: sanitizeText(car?.advert?.attentionGrabber) || "",
    autoTraderRating: sanitizeText(car.priceIndicator?.toLowerCase()) || "",
    carGuruRating: getCarGurusRating(car.registration, carGurusRatings),
    specs: buildCarSpecs(car),
  }));

  return processedCars;
}
