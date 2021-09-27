export type RentParam =
  | "investmentReturn"
  | "leaseDuration"
  | "monthlyRent"
  | "rentersInsurance"
  | "yearlyIncrease";

export type RentFormModel = Record<RentParam, number | undefined>;

interface IRentParameter {
  label: string;
  name: RentParam;
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
