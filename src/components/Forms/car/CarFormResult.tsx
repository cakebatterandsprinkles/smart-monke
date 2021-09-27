import type { FC } from "react";
import { calculateCashCost, calculateLeaseCost, calculateLoanCost } from "../../../calculators/car";
import type { CashFormModel } from "../../../data/car/cash";
import { cashParameters } from "../../../data/car/cash";
import type { LeaseFormModel } from "../../../data/car/lease";
import { leaseParameters } from "../../../data/car/lease";
import type { LoanFormModel } from "../../../data/car/loan";
import { loanParameters } from "../../../data/car/loan";
import Results from "../../Results/Results";
import styles from "../Form.module.css";

interface CarFormResultProps {
  data: {
    cash: CashFormModel;
    loan: LoanFormModel;
    lease: LeaseFormModel;
  };
  paymentMethod: string;
  onClose: () => void;
}

const CarFormResult: FC<CarFormResultProps> = ({ data, paymentMethod, onClose }) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const cashCost = calculateCashCost({
    salesPrice: data.cash.salesPrice ?? 0,
    cashSalesTax: data.cash.cashSalesTax ?? 0,
    upfrontCashCost: data.cash.upfrontCashCosts ?? 0,
  });

  const loanCost = calculateLoanCost({
    loanDuration: data.loan.loanDuration ?? 0,
    monthlyLoanPayment: data.loan.monthlyLoanPayment ?? 0,
    salesTax: data.loan.loanSalesTax ?? 0,
    downPayment: data.loan.upfrontLoanCosts ?? 0,
    yearlyReturn: data.lease.investmentReturn ?? 0,
  });

  const leaseCost = calculateLeaseCost({
    salesTax: data.lease.leaseSalesTax ?? 0,
    yearlyReturn: data.lease.investmentReturn ?? 0,
    leaseMonths: data.lease.leaseDuration ?? 0,
    monthlyLeasePrice: data.lease.monthlyLeasePrice ?? 0,
    residualPrice: data.lease.residualPrice ?? 0,
    taxesAndFees: data.lease.leaseTaxesAndFees ?? 0,
    upfrontPayment: data.lease.upfrontLeasePayment ?? 0,
  });

  const buyCost = paymentMethod === "Cash" ? cashCost : loanCost;

  return (
    <div className={styles.mainResultsContainer}>
      <div className={styles.parameterWrapper}>
        <div className={styles.formContainer}>
          <p className={styles.parameterHeader}>{paymentMethod.toUpperCase()}</p>
          <div className={styles.parameterContainer}>
            {paymentMethod === "Cash"
              ? cashParameters.map((param, index) => (
                  <div className={styles.parameter} key={`${param.name}-${index}`}>
                    <span className={styles.bold}>{param.label}</span>
                    <span>
                      {param.prefix === "$"
                        ? currencyFormatter.format(data.cash[param.name] ?? 0)
                        : `${param.prefix}${data.cash[param.name] ?? 0} ${param.suffix}`}
                    </span>
                  </div>
                ))
              : loanParameters.map((param, index) => (
                  <div className={styles.parameter} key={`${param.name}-${index}`}>
                    <span className={styles.bold}>{`${param.label}`}</span>
                    <span>
                      {param.prefix === "$"
                        ? currencyFormatter.format(data.loan[param.name] ?? 0)
                        : `${param.prefix}${data.loan[param.name] ?? 0} ${param.suffix}`}
                    </span>
                  </div>
                ))}
            <div className={styles.parameter}>
              <span className={styles.bold}>TOTAL COST</span>
              <span>{currencyFormatter.format(buyCost)}</span>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <p className={styles.parameterHeader}>LEASE</p>
          <div className={styles.parameterContainer}>
            {leaseParameters.map((param, index) => (
              <div className={styles.parameter} key={`${param.name}-${index}`}>
                <span className={styles.bold}>{param.label}</span>
                <span>
                  {param.prefix === "$"
                    ? currencyFormatter.format(data.lease[param.name] ?? 0)
                    : `${param.prefix}${data.lease[param.name] ?? 0} ${param.suffix}`}
                </span>
              </div>
            ))}
            <div className={styles.parameter}>
              <span className={styles.bold}>TOTAL COST</span>
              <span>{currencyFormatter.format(leaseCost)}</span>
            </div>
          </div>
        </div>
      </div>
      <Results>
        Buying this car is{" "}
        <span className={styles.bold}>
          {Math.abs((100 * buyCost) / leaseCost - 100).toFixed(2)}%{" "}
          {buyCost > leaseCost ? "more expensive" : "cheaper"}
        </span>{" "}
        than leasing it.
      </Results>

      <div className={styles.buttonContainer}>
        <button onClick={onClose}>Change Parameters</button>
      </div>
    </div>
  );
};

export default CarFormResult;
