export type BuyParam =
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

export type BuyFormModel = Record<BuyParam, number | undefined>;

interface IBuyParameter {
  label: string;
  name: BuyParam;
  prefix: string;
  suffix: string;
  tooltipText: string;
}

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
