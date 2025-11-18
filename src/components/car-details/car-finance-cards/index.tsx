import { useState } from "react";
import Button from "@elements-dir/button";

export default function CarFinanceCard({
  type,
  price,
  benefits,
  btnText,
}: {
  type: "monthly" | "full";
  price: {
    monthly?: { PCP: number | null; HP: number | null };
    full?: number | null;
  };
  benefits: string[];
  btnText: string;
}) {
  const isMonthly = type === "monthly";

  // === Dynamic default category ===
  const defaultCategory: "PCP" | "HP" = (() => {
    if (price.monthly?.PCP) return "PCP";
    if (price.monthly?.HP) return "HP";
    return "PCP"; // fallback, shouldn't happen
  })();

  const [category, setCategory] = useState<"PCP" | "HP">(defaultCategory);

  const toggleCategory = () => {
    // Only toggle if both options exist
    if (price.monthly?.PCP && price.monthly?.HP) {
      setCategory(category === "PCP" ? "HP" : "PCP");
    }
  };

  // Ensure displayedPrice exists
  const displayedPrice =
    isMonthly && price.monthly?.[category]
      ? price.monthly[category]
      : price.full;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 flex flex-col gap-6 hover:ring-2 hover:ring-primary/40 hover:ring-offset-2">
      {/* === Header === */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {isMonthly ? "Pay Monthly" : "Pay in Full"}
        </h2>

        {/* PCP/HP toggle only if monthly */}
        {isMonthly && (price.monthly?.PCP || price.monthly?.HP) && (
          <button
            onClick={toggleCategory}
            type="button"
            className={`
      relative flex items-center h-7 
      ${price.monthly?.PCP && price.monthly?.HP ? "w-18" : "w-10"} 
      rounded-full bg-gray-200 cursor-pointer overflow-hidden
      ring-1 ring-gray-300 hover:ring-primary/40 
      transition-all duration-300 focus:outline-none
    `}
          >
            {/* === Knob === */}
            <span
              className={`
        absolute left-1 h-5 w-8 rounded-full bg-primary text-white
        flex items-center justify-center text-xs font-semibold shadow-md
        transform transition-transform duration-300
        ${
          category === "HP" && price.monthly?.PCP && price.monthly?.HP
            ? "translate-x-8"
            : "translate-x-0"
        }
      `}
            >
              {category}
            </span>

            {/* === Labels === */}
            {price.monthly?.PCP && price.monthly?.HP ? (
              <div className="w-full flex justify-between px-3 text-xs font-semibold">
                {["PCP", "HP"].map((label) => (
                  <span
                    key={label}
                    className={`transition-colors duration-300 ${
                      category === label ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : (
              <div className="w-full flex justify-center px-3 text-xs font-semibold">
                <span className="text-white">
                  {price.monthly?.PCP ? "PCP" : "HP"}
                </span>
              </div>
            )}
          </button>
        )}
      </div>

      {/* === Benefits + Price === */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        <ul className="list-disc list-inside space-y-1 text-sm sm:w-2/3">
          {benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>

        <div className="text-left sm:text-right sm:w-1/3">
          {!isMonthly && (
            <p className="text-xs text-gray-500 font-medium">Total</p>
          )}
          <p className="text-3xl sm:text-4xl font-semibold text-primary">
            {`£${displayedPrice?.toLocaleString()}`}
          </p>
          {isMonthly && <p className="text-xs text-gray-500"> /month</p>}
        </div>
      </div>

      {/* === Button === */}
      <div>
        <Button
          variant="secondary"
          btnText={btnText}
          paddingUtilities="px-4 py-2"
          widthUtilities="w-full"
          btnTextSize="text-base font-semibold"
        />
      </div>
    </div>
  );
}
