interface ICashParameter {
  label: string;
  name: "salesPrice" | "salesTax" | "upfrontCosts";
  prefix: string;
  suffix: string;
  tooltipText: string;
}

interface ILoanParameter {
  label: string;
  name: "loanDuration" | "monthlyLoanPayment" | "salesTax" | "upfrontCosts";
  prefix: string;
  suffix: string;
  tooltipText: string;
}

interface ILeaseParameter {
  label: string;
  name:
    | "investmentReturn"
    | "leaseDuration"
    | "monthlyLeasePrice"
    | "residualPrice"
    | "salesTax"
    | "taxesAndFees"
    | "upfrontPayment";
  prefix: string;
  suffix: string;
  tooltipText: string;
}

export const cashParameters: ICashParameter[] = [
  {
    label: "Sales Price",
    name: "salesPrice",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Sales Tax",
    name: "salesTax",
    prefix: "",
    suffix: "%",
    tooltipText: "",
  },
  {
    label: "Upfront Costs",
    name: "upfrontCosts",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
];

export const loanParameters: ILoanParameter[] = [
  {
    label: "Monthly Loan Payment",
    name: "monthlyLoanPayment",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Loan Duration",
    name: "loanDuration",
    prefix: "",
    suffix: " months",
    tooltipText: "",
  },
  {
    label: "Sales Tax",
    name: "salesTax",
    prefix: "",
    suffix: "%",
    tooltipText: "",
  },
  {
    label: "Down Payment",
    name: "upfrontCosts",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
];

export const leaseParameters: ILeaseParameter[] = [
  {
    label: "Monthly Lease Price",
    name: "monthlyLeasePrice",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Sales Tax",
    name: "salesTax",
    prefix: "",
    suffix: "%",
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
    label: "Residual Price",
    name: "residualPrice",
    prefix: "$",
    suffix: "",
    tooltipText: "The price you can buy the car at the end of the lease period.",
  },
  {
    label: "Yearly Investment Return",
    name: "investmentReturn",
    prefix: "",
    suffix: "%",
    tooltipText: "Expected yearly return on financial investments.",
  },

  {
    label: "Upfront Payment",
    name: "upfrontPayment",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Taxes and Fees",
    name: "taxesAndFees",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
];
