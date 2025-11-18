export interface CarSpecs {
  category: string;
  specs: { label: string; value: any }[];
}

interface CarSpecsDefinition {
  category: string;
  specs: {
    key: string;
    label: string;
    preFix?: string;
    postFix?: string;
  }[];
}

export function processCarDetailsSpecs(rawData: any): CarSpecs[] {
  if (!rawData || typeof rawData !== "object") return [];

  // === Define your spec categories ===
  const dataSet: CarSpecsDefinition[] = [
    {
      category: "General",
      specs: [
        { key: "vehicleType", label: "Vehicle Type" },
        { key: "grossVehicleWeightKG", label: "Gross Weight", postFix: "KG" },
      ],
    },
    {
      category: "Engine & Drive Train",
      specs: [
        { key: "cylinderArrangement", label: "Cylinder Layout", postFix: "" },
        { key: "transmissionType", label: "Transmission", postFix: "" },
        { key: "cylinders", label: "Cylinders", postFix: "" },
        { key: "fuelDelivery", label: "Fuel Delivery", postFix: "" },
        { key: "gears", label: "No. of Gears", postFix: "" },
        { key: "engineCapacityCC", label: "CC", postFix: "" },
      ],
    },
    {
      category: "Fuel Consumption",
      specs: [
        { key: "fuelType", label: "Fuel Type", postFix: "" },
        {
          key: "fuelEconomyNEDCExtraUrbanMPG",
          label: "EC Extra Urban",
          postFix: "MPG",
        },
        { key: "fuelEconomyNEDCUrbanMPG", label: "EC Urban", postFix: "MPG" },
        {
          key: "fuelEconomyNEDCCombinedMPG",
          label: "EC Combined Urban",
          postFix: "MPG",
        },
      ],
    },
    {
      category: "Emissions",
      specs: [
        { key: "co2EmissionGPKM", label: "CO2", postFix: "g/KM" },
        { key: "emissionClass", label: "Standard Euro Emission", postFix: "" },
      ],
    },
    {
      category: "Performance",
      specs: [
        { key: "topSpeedMPH", label: "Top Speed", postFix: "MPH" },
        { key: "zeroToSixtyMPHSeconds", label: "0-60 mph", postFix: "secs" },
        {
          key: "zeroToOneHundredKMPHSeconds",
          label: "0-100 km/h",
          postFix: "secs",
        },
        {
          key: "enginePowerBHP",
          label: "Engine Power",
          postFix: "BHP",
        },
      ],
    },
  ];

  // === Helper: Get value safely (case-insensitive, nested support) ===
  const getValueFromRawData = (key: string, obj: any): any => {
    if (!obj) return undefined;
    const normalizedKey = key.toLowerCase();

    // Try direct key match (case-insensitive)
    const foundKey = Object.keys(obj).find(
      (k) => k.toLowerCase() === normalizedKey
    );

    if (foundKey) return obj[foundKey];

    // Try nested match (e.g. specs.grossVehicleWeightKG)
    for (const val of Object.values(obj)) {
      if (val && typeof val === "object") {
        const nestedValue = getValueFromRawData(key, val);
        if (nestedValue !== undefined) return nestedValue;
      }
    }

    return undefined;
  };

  // === Helper: Clean and format values ===
  const sanitizeValue = (
    label: string,
    value: any,
    preFix?: string,
    postFix?: string
  ) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    )
      return null;

    const formatted = `${preFix ?? ""}${value}${
      postFix ? " " + postFix : ""
    }`.trim();

    return { label, value: formatted };
  };

  // === Build the grouped structure ===
  const results: CarSpecs[] = dataSet.map(({ category, specs }) => {
    const validSpecs = specs
      .map(({ key, label, preFix, postFix }) => {
        const rawValue = getValueFromRawData(key, rawData);
        return sanitizeValue(label, rawValue, preFix, postFix);
      })
      .filter((v): v is { label: string; value: any } => v !== null);

    return { category, specs: validSpecs };
  });

  // === Filter out empty categories ===
  return results.filter((c) => c.specs.length > 0);
}
