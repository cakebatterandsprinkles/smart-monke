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
}

export const rentParameters: IRentParameter[] = [
  {
    label: "Monthly rent",
    name: "monthlyRent",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Lease Duration",
    name: "leaseDuration",
    prefix: "",
    suffix: " months",
  },
  {
    label: "Renters insurance",
    name: "rentersInsurance",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Yearly Rent Increase",
    name: "yearlyIncrease",
    prefix: "",
    suffix: "%",
  },
  {
    label: "Investment Return",
    name: "investmentReturn",
    prefix: "",
    suffix: "%",
  },
];

export const buyParameters: IBuyParameter[] = [
  {
    label: "Sales Price",
    name: "salesPrice",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Home Insurance",
    name: "homeInsurance",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Property Tax",
    name: "propertyTax",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Mortgage Duration",
    name: "mortgageDuration",
    prefix: "",
    suffix: " months",
  },
  {
    label: "Mortgage Rate",
    name: "mortgageRate",
    prefix: "",
    suffix: " %",
  },
  {
    label: "Down Payment",
    name: "downPayment",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Mortgage Insurance",
    name: "mortgageInsurance",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Monthly HOA Payments",
    name: "hoa",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Upkeep Costs: (~1%)",
    name: "upkeepCosts",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Closing Costs",
    name: "closingCosts",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Yearly Value Increase",
    name: "yearlyPriceIncrease",
    prefix: "",
    suffix: "%",
  },
];
