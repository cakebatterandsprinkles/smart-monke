interface IRentParameter {
  label: string;
  name:
    | "investmentReturn"
    | "leaseDuration"
    | "monthlyRent"
    | "rentersInsurance"
    | "yearlyIncrease";
  prefix: string;
  suffix: string;
  tooltipText: string;
}

interface IBuyParameter {
  label: string;
  name:
    | "closingCosts"
    | "downPayment"
    | "hoa"
    | "homeInsurance"
    | "mortgageDuration"
    | "mortgageInsurance"
    | "mortgageRate"
    | "propertyTax"
    | "salesPrice"
    | "upkeepCosts"
    | "yearlyPriceIncrease";
  prefix: string;
  suffix: string;
  tooltipText: string;
}

export const rentParameters: IRentParameter[] = [
  {
    label: "Monthly rent",
    name: "monthlyRent",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Lease Duration",
    name: "leaseDuration",
    prefix: "",
    suffix: " months",
    tooltipText: "",
  },
  {
    label: "Renters insurance",
    name: "rentersInsurance",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Yearly Rent Increase",
    name: "yearlyIncrease",
    prefix: "",
    suffix: "%",
    tooltipText: "",
  },
  {
    label: "Investment Return",
    name: "investmentReturn",
    prefix: "",
    suffix: "%",
    tooltipText: "Expected yearly return on financial investments.",
  },
];

export const buyParameters: IBuyParameter[] = [
  {
    label: "Sales Price",
    name: "salesPrice",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Home Insurance",
    name: "homeInsurance",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Property Tax",
    name: "propertyTax",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Mortgage Duration",
    name: "mortgageDuration",
    prefix: "",
    suffix: " months",
    tooltipText: "",
  },
  {
    label: "Mortgage Rate",
    name: "mortgageRate",
    prefix: "",
    suffix: " %",
    tooltipText: "",
  },
  {
    label: "Down Payment",
    name: "downPayment",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Mortgage Insurance",
    name: "mortgageInsurance",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Monthly HOA Payments",
    name: "hoa",
    prefix: "$",
    suffix: "",
    tooltipText: "HOA: Home Owners Association",
  },
  {
    label: "Upkeep Costs",
    name: "upkeepCosts",
    prefix: "$",
    suffix: "",
    tooltipText: "Around 1% of the sales price is recommended.",
  },
  {
    label: "Closing Costs",
    name: "closingCosts",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Yearly Value Increase",
    name: "yearlyPriceIncrease",
    prefix: "",
    suffix: "%",
    tooltipText: "Historically home values increase by 3-4% annually.",
  },
];
