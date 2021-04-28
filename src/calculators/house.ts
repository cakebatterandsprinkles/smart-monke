type RentForm = Record<
  "leaseMonths" | "monthlyRent" | "rentersInsurance" | "yearlyIncrease" | "yearlyReturn",
  number
>;

export const calculateRentCost = ({
  leaseMonths,
  monthlyRent,
  rentersInsurance,
  yearlyIncrease,
  yearlyReturn,
}: RentForm): number => {
  let total = 0;

  const monthlyReturn = Math.pow(1 + yearlyReturn / 100, 1 / 12);
  for (let month = 0; month < leaseMonths; month++) {
    if (month % 12 === 0) {
      total += rentersInsurance * Math.pow(1 / monthlyReturn, month);

      if (month > 0) monthlyRent = monthlyRent * (1 + yearlyIncrease / 100);
    }

    total += monthlyRent * Math.pow(1 / monthlyReturn, month);
  }

  return total;
};

type BuyForm = Record<
  | "closingCosts"
  | "downPayment"
  | "homeInsurance"
  | "leaseMonths"
  | "monthlyHoaPayments"
  | "mortgageDuration"
  | "mortgageInsurance"
  | "mortgageRate"
  | "propertyTax"
  | "salesPrice"
  | "upkeepCosts"
  | "yearlyInvestmentReturn"
  | "yearlyPriceIncrease",
  number
>;

export const calculateBuyCost = ({
  closingCosts,
  downPayment,
  homeInsurance,
  monthlyHoaPayments,
  mortgageDuration,
  mortgageInsurance,
  mortgageRate,
  propertyTax,
  leaseMonths,
  salesPrice,
  upkeepCosts,
  yearlyInvestmentReturn,
  yearlyPriceIncrease,
}: BuyForm): number => {
  //initial costs
  let totalCost = downPayment + closingCosts;

  const monthlyReturn = Math.pow(1 + yearlyInvestmentReturn / 100, 1 / 12);

  const monthlyInterestRate = mortgageRate / 100 / 12;
  const monthlyMortgagePayments =
    ((salesPrice - downPayment) *
      (monthlyInterestRate * Math.pow(monthlyInterestRate + 1, mortgageDuration))) /
    (Math.pow(monthlyInterestRate + 1, mortgageDuration) - 1);

  const yearlyPayments = propertyTax + upkeepCosts + homeInsurance;

  const monthlyPayments =
    monthlyMortgagePayments + monthlyHoaPayments + mortgageInsurance + yearlyPayments / 12;

  totalCost +=
    ((Math.pow(1 / monthlyReturn, mortgageDuration) - 1) / (1 / monthlyReturn - 1)) *
    monthlyPayments;

  const homeValue =
    salesPrice *
    Math.pow(1 + yearlyPriceIncrease / 100, leaseMonths / 12) *
    Math.pow(1 / monthlyReturn, leaseMonths);

  return totalCost - homeValue;
};
