/**
 * Finance Calculator Helper
 * Replicates C# finance calculation logic for PCP/HP finance representations
 */

export interface FinanceInputs {
  totalCash: number;
  deposit: number;
  apr: number;
  nbrOfMonths: number;
  finalPaymentPercentage?: number; // Optional, defaults to 50% (0.5)
}

export interface FinanceCalculations {
  borrowing: number;
  monthlyPayment: number;
  finalPayment: number;
  totalAmountPayable: number;
  amountOfInterest: number;
}

/**
 * Calculate the borrowing amount (principal)
 * @param totalCash - Total cash price
 * @param deposit - Initial deposit amount
 * @returns Borrowing amount rounded to 2 decimal places
 */
export function calculateBorrowing(totalCash: number, deposit: number): number {
  return Math.round((totalCash - deposit) * 100) / 100;
}

/**
 * Calculate monthly payment using compound interest formula
 * @param principal - Amount borrowed
 * @param apr - Annual Percentage Rate
 * @param months - Number of months
 * @returns Monthly payment rounded to 2 decimal places
 */
export function calculateMonthlyPayment(
  principal: number,
  apr: number,
  months: number
): number {
  if (months <= 0 || principal <= 0) return 0;

  const r = apr / 100 / 12; // Monthly interest rate

  if (r === 0) {
    // If APR is 0%, just divide principal by months
    return Math.round((principal / months) * 100) / 100;
  }

  const pow = Math.pow(1 + r, months);
  const denom = pow - 1;

  if (denom === 0) return 0;

  const monthlyPayment = (principal * r * pow) / denom;
  return Math.round(monthlyPayment * 100) / 100;
}

/**
 * Calculate total amount payable
 * @param monthlyPayment - Monthly payment amount
 * @param months - Number of months
 * @param finalPayment - Final balloon payment
 * @returns Total amount payable rounded to 2 decimal places
 */
export function calculateTotalAmountPayable(
  monthlyPayment: number,
  months: number,
  finalPayment: number
): number {
  return Math.round((monthlyPayment * months + finalPayment) * 100) / 100;
}

/**
 * Calculate total interest charged
 * @param totalAmountPayable - Total amount to be paid
 * @param borrowing - Amount borrowed
 * @returns Amount of interest rounded to 2 decimal places
 */
export function calculateAmountOfInterest(
  totalAmountPayable: number,
  borrowing: number
): number {
  return Math.round((totalAmountPayable - borrowing) * 100) / 100;
}

/**
 * Perform all finance calculations
 * @param inputs - Finance input parameters
 * @returns All calculated finance values
 */
export function calculateFinance(inputs: FinanceInputs): FinanceCalculations {
  const { totalCash, deposit, apr, nbrOfMonths, finalPaymentPercentage = 0.5 } = inputs;

  const borrowing = calculateBorrowing(totalCash, deposit);
  const monthlyPayment = calculateMonthlyPayment(borrowing, apr, nbrOfMonths);
  const finalPayment = Math.round(monthlyPayment * finalPaymentPercentage * 100) / 100;
  const totalAmountPayable = calculateTotalAmountPayable(
    monthlyPayment,
    nbrOfMonths,
    finalPayment
  );
  const amountOfInterest = calculateAmountOfInterest(totalAmountPayable, borrowing);

  return {
    borrowing,
    monthlyPayment,
    finalPayment,
    totalAmountPayable,
    amountOfInterest,
  };
}

/**
 * Format number as currency string
 * @param amount - Number to format
 * @param currencySymbol - Currency symbol (default: £)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencySymbol: string = "£"): string {
  return `${currencySymbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
