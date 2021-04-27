interface ICashParameter {
  label: string;
  name: "salesPrice" | "salesTax" | "upfrontCosts";
  prefix: string;
  suffix: string;
}

interface ILoanParameter {
  label: string;
  name: "loanDuration" | "monthlyLoanPayment" | "salesTax" | "upfrontCosts";
  prefix: string;
  suffix: string;
}

interface ILeaseParameter {
  label: string;
  name: "investmentReturn" | "leaseDuration" | "monthlyLeasePrice" | "residualPrice" | "salesTax";
  prefix: string;
  suffix: string;
}

export const cashParameters: ICashParameter[] = [
  {
    label: "Sales Price:",
    name: "salesPrice",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Sales Tax:",
    name: "salesTax",
    prefix: "",
    suffix: "%",
  },
  {
    label: "Upfront Costs:",
    name: "upfrontCosts",
    prefix: "$",
    suffix: "",
  },
];

export const loanParameters: ILoanParameter[] = [
  {
    label: "Monthly Loan Payment:",
    name: "monthlyLoanPayment",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Loan Duration:",
    name: "loanDuration",
    prefix: "",
    suffix: " months",
  },
  {
    label: "Sales Tax:",
    name: "salesTax",
    prefix: "",
    suffix: "%",
  },
  {
    label: "Down Payment:",
    name: "upfrontCosts",
    prefix: "$",
    suffix: "",
  },
];

export const leaseParameters: ILeaseParameter[] = [
  {
    label: "Monthly Lease Price:",
    name: "monthlyLeasePrice",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Sales Tax:",
    name: "salesTax",
    prefix: "",
    suffix: "%",
  },
  {
    label: "Lease Duration:",
    name: "leaseDuration",
    prefix: "",
    suffix: " months",
  },
  {
    label: "Residual Price:",
    name: "residualPrice",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Yearly Investment Return:",
    name: "investmentReturn",
    prefix: "",
    suffix: "%",
  },
];
