export type CashParam = "cashSalesTax" | "salesPrice" | "upfrontCashCosts";

export type CashFormModel = Record<CashParam, number | undefined>;

interface ICashParameter {
  label: string;
  name: CashParam;
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
    name: "cashSalesTax",
    prefix: "",
    suffix: "%",
    tooltipText: "",
  },
  {
    label: "Upfront Costs",
    name: "upfrontCashCosts",
    prefix: "$",
    suffix: "",
    tooltipText: "",
  },
];
