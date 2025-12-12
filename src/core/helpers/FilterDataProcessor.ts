import {
  type FilterCategory,
  type FilterOption,
  type RawData,
} from "@components-dir/filter/filter.types";

export function transformFilterData(data: RawData): FilterCategory[] {
  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const makeOptions = (
    arr: string[],
    counts: Record<string, number> = {}
  ): { options: FilterOption[]; total: number } => {
    const options: FilterOption[] = arr.map((item, index) => ({
      id: index + 1,
      label: `${toTitleCase(item)} (${counts[item] || 0})`,
      value: item.toLowerCase(),
      count: counts[item] || 0,
    }));
    const total = options.reduce((sum, opt) => sum + opt.count, 0);
    return { options, total };
  };

  const filters: FilterCategory[] = [
    {
      filterName: "Make",
      filterKey: "make",
      ...makeOptions(data.makes, data.makeCounts),
    },
    {
      filterName: "Model",
      filterKey: "model",
      ...makeOptions(data.models, data.modelCounts),
    },
    {
      filterName: "Body Type",
      filterKey: "bodytype",
      ...makeOptions(data.bodyTypes, data.bodyTypeCounts),
    },
    {
      filterName: "Fuel Type",
      filterKey: "fueltype",
      ...makeOptions(data.fuelTypes, data.fuelTypeCounts),
    },
    {
      filterName: "Transmission",
      filterKey: "transmission",
      ...makeOptions(data.transmissions, data.transmissionCounts),
    },
    {
      filterName: "Colour",
      filterKey: "colour",
      ...makeOptions(data.colours, data.colourCounts),
    },
  ];

  return filters;
}
