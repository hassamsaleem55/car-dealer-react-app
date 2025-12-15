import { useState } from "react";
import Button from "@elements-dir/button";

export default function CarFinanceCard({
  type,
  price,
  benefits,
  btnText,
  onButtonClick,
}: {
  type: "monthly" | "full";
  price: {
    monthly?: { PCP: number | null; HP: number | null };
    full?: number | null;
  };
  benefits: string[];
  btnText: string;
  onButtonClick?: () => void;
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
    <div className="rounded-2xl bg-white border border-gray-200 shadow-xl transition-all duration-300 p-6 flex flex-col gap-4 md:gap-6 hover:shadow-2xl hover:border-primary/50 group">
      {/* === Header === */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl md:text-3xl font-semibold">
          {isMonthly ? "Pay Monthly" : "Pay in Full"}
        </h2>

        {/* PCP/HP toggle only if monthly */}
        {isMonthly && (price.monthly?.PCP || price.monthly?.HP) && (
          <button
            onClick={toggleCategory}
            type="button"
            className={`
      relative flex items-center h-8 
      ${price.monthly?.PCP && price.monthly?.HP ? "w-20" : "w-12"} 
      rounded-full cursor-pointer overflow-hidden
      border-2 border-gray-300 hover:border-primary/40 shadow-md hover:shadow-lg
      transition-all duration-300 focus:outline-none
    `}
          >
            {/* === Knob === */}
            <span
              className={`
        absolute left-1 h-6 w-9 rounded-full bg-primary/90 text-white
        flex items-center justify-center text-xs font-bold shadow-lg
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
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="font-medium">{benefit}</li>
          ))}
        </ul>

        <div className="text-left md:text-right bg-linear-to-br from-primary/5 to-transparent px-4 py-3 rounded-xl border border-primary/20">
          {!isMonthly && (
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Total</p>
          )}
          <p className="text-2xl md:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {`£${displayedPrice?.toLocaleString()}`}
          </p>
          {isMonthly && <p className="text-xs text-gray-600 font-medium"> /month</p>}
        </div>
      </div>

      {/* === Button === */}
      <div>
        <Button
          variant="secondary"
          btnText={btnText}
          paddingUtilities="px-4 py-2"
          widthUtilities="w-full"
          btnTextSize="text-sm md:text-base font-semibold"
          clickEvent={onButtonClick}
        />
      </div>
    </div>
  );
}
