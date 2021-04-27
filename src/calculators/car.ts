type LeaseForm = Record<
  | "leaseMonths"
  | "monthlyLeasePrice"
  | "residualPrice"
  | "salesTax"
  | "taxesAndFees"
  | "upfrontPayment"
  | "yearlyReturn",
  number
>;

export const calculateLeaseCost = ({
  leaseMonths,
  monthlyLeasePrice,
  residualPrice,
  salesTax,
  upfrontPayment,
  taxesAndFees,
  yearlyReturn,
}: LeaseForm): number => {
  let total = upfrontPayment + taxesAndFees;

  const monthlyReturn = Math.pow(1 + yearlyReturn / 100, 1 / 12);

  if (yearlyReturn === 0) {
    total += leaseMonths * monthlyLeasePrice * (1 + salesTax / 100);
  } else {
    total +=
      ((Math.pow(1 / monthlyReturn, leaseMonths) - 1) / (1 / monthlyReturn - 1)) *
      monthlyLeasePrice *
      (1 + salesTax / 100);
  }

  total += residualPrice * Math.pow(1 / monthlyReturn, leaseMonths);

  return total;
};

type LoanForm = Record<
  "downPayment" | "loanDuration" | "monthlyLoanPayment" | "salesTax" | "yearlyReturn",
  number
>;

export const calculateLoanCost = ({
  loanDuration,
  monthlyLoanPayment,
  downPayment,
  yearlyReturn,
  salesTax,
}: LoanForm): number => {
  let total = downPayment;

  const monthlyReturn = Math.pow(1 + yearlyReturn / 100, 1 / 12);

  if (yearlyReturn === 0) {
    total += loanDuration * monthlyLoanPayment * (1 + salesTax / 100);
  } else {
    total +=
      ((Math.pow(1 / monthlyReturn, loanDuration) - 1) / (1 / monthlyReturn - 1)) *
      monthlyLoanPayment *
      (1 + salesTax / 100);
  }

  return total;
};

type BuyForm = Record<"salesPrice" | "salesTax" | "upfrontCost", number>;

export const calculateBuyCost = ({ salesPrice, salesTax, upfrontCost }: BuyForm): number => {
  return salesPrice * salesTax + upfrontCost;
};
