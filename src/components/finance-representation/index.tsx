import { useMemo } from "react";
import {
  calculateFinance,
  formatCurrency,
  type FinanceInputs,
} from "@core-dir/helpers/FinanceCalculator";

interface FinanceRepresentationProps {
  totalCash: number;
  deposit: number;
  apr: number;
  nbrOfMonths: number;
  finalPaymentPercentage?: number;
  currencySymbol?: string;
  financeType?: "PCP" | "HP";
}

export default function FinanceRepresentation({
  totalCash,
  deposit,
  apr,
  nbrOfMonths,
  finalPaymentPercentage = 0.5,
  currencySymbol = "£",
  financeType = "PCP",
}: FinanceRepresentationProps) {
  const calculations = useMemo(() => {
    const inputs: FinanceInputs = {
      totalCash,
      deposit,
      apr,
      nbrOfMonths,
      finalPaymentPercentage,
    };
    return calculateFinance(inputs);
  }, [totalCash, deposit, apr, nbrOfMonths, finalPaymentPercentage]);

  const {
    borrowing,
    monthlyPayment,
    finalPayment,
    totalAmountPayable,
    amountOfInterest,
  } = calculations;

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-4 py-2 shadow-sm">
      <h2 className="text-xs md:text-sm text-center mb-1 font-semibold text-blue-900">
        Representative Example [{financeType}]
      </h2>
      <p className="text-[8px] md:text-[10px]  text-gray-800 text-justify sm:text-left">
        An On-The-Road (OTR) cash price of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(totalCash, currencySymbol)}
        </span>
        , with a deposit of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(deposit, currencySymbol)}
        </span>
        , leaves an amount of credit of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(borrowing, currencySymbol)}
        </span>
        . This agreement results in a representative{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">{apr.toFixed(2)}% APR</span>,
        with total interest payable of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(amountOfInterest, currencySymbol)}
        </span>
        , giving a total amount payable of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(totalAmountPayable, currencySymbol)}
        </span>
        . Payments are based on an agreement term of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">{nbrOfMonths} months</span>,
        with monthly payments of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(monthlyPayment, currencySymbol)}
        </span>
        , followed by a final payment of{" "}
        <span className="font-semibold text-blue-900 whitespace-nowrap">
          {formatCurrency(finalPayment, currencySymbol)}
        </span>
        .
      </p>
    </div>
  );
}
