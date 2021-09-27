export type LoanParam = "loanDuration" | "loanSalesTax" | "monthlyLoanPayment" | "upfrontLoanCosts";

export type LoanFormModel = Record<LoanParam, number | undefined>;

interface ILoanParameter {
  label: string;
  name: LoanParam;
  prefix: string;
  suffix: string;
  tooltipText: string;
}

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
    name: "loanSalesTax",
    prefix: "",
    suffix: "%",
    tooltipText: "",
  },
  {
    label: "Down Payment",
    name: "upfrontLoanCosts",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
];
