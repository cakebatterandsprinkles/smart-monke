export type LeaseParam =
  | "investmentReturn"
  | "leaseDuration"
  | "leaseSalesTax"
  | "leaseTaxesAndFees"
  | "monthlyLeasePrice"
  | "residualPrice"
  | "upfrontLeasePayment";

export type LeaseFormModel = Record<LeaseParam, number | undefined>;

interface ILeaseParameter {
  label: string;
  name: LeaseParam;
  prefix: string;
  suffix: string;
  tooltipText: string;
}

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
    name: "leaseSalesTax",
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
    name: "upfrontLeasePayment",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
  {
    label: "Taxes and Fees",
    name: "leaseTaxesAndFees",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
];
