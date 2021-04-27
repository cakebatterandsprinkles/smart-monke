interface IRentParameter {
  label: string;
  name: "investmentReturn" | "leaseDuration" | "monthlyRent" | "rentersInsurance";
  prefix: string;
  suffix: string;
}

export const rentParameters: IRentParameter[] = [
  {
    label: "Monthly rent:",
    name: "monthlyRent",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Lease Duration:",
    name: "leaseDuration",
    prefix: "",
    suffix: " months",
  },
  {
    label: "Renters insurance:",
    name: "rentersInsurance",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Investment Return:",
    name: "investmentReturn",
    prefix: "",
    suffix: "%",
  },
];
