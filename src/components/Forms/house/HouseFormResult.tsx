import type { FC } from "react";
import { calculateBuyCost, calculateRentCost } from "../../../calculators/house";
import type { BuyFormModel } from "../../../data/house/buy";
import { buyParameters } from "../../../data/house/buy";
import type { RentFormModel } from "../../../data/house/rent";
import { rentParameters } from "../../../data/house/rent";
import Results from "../../Results/Results";
import styles from "../Form.module.css";

interface HouseFormResultProps {
  data: {
    buy: BuyFormModel;
    rent: RentFormModel;
  };
  onClose: () => void;
}

const HouseFormResult: FC<HouseFormResultProps> = ({ data, onClose }) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const buyingCost = calculateBuyCost({
    closingCosts: data.buy.closingCosts ?? 0,
    downPayment: data.buy.downPayment ?? 0,
    homeInsurance: data.buy.homeInsurance ?? 0,
    leaseMonths: data.rent.leaseDuration ?? 0,
    monthlyHoaPayments: data.buy.hoa ?? 0,
    mortgageDuration: data.buy.mortgageDuration ?? 0,
    mortgageInsurance: data.buy.mortgageInsurance ?? 0,
    mortgageRate: data.buy.mortgageRate ?? 0,
    propertyTax: data.buy.propertyTax ?? 0,
    salesPrice: data.buy.salesPrice ?? 0,
    upkeepCosts: data.buy.upkeepCosts ?? 0,
    yearlyInvestmentReturn: data.rent.investmentReturn ?? 0,
    yearlyPriceIncrease: data.buy.yearlyPriceIncrease ?? 0,
  });

  const rentingCost = calculateRentCost({
    leaseMonths: data.rent.leaseDuration ?? 0,
    monthlyRent: data.rent.monthlyRent ?? 0,
    rentersInsurance: data.rent.rentersInsurance ?? 0,
    yearlyIncrease: data.rent.yearlyIncrease ?? 0,
    yearlyReturn: data.rent.investmentReturn ?? 0,
  });

  return (
    <div className={styles.mainResultsContainer}>
      <div className={styles.parameterWrapper}>
        <div className={styles.formContainer}>
          <p className={styles.parameterHeader}>RENT</p>
          <div className={styles.parameterContainer}>
            {rentParameters.map((param, index) => (
              <div className={styles.parameter} key={`${param.name}-${index}`}>
                <span className={styles.bold}>{param.label} </span>
                <span>
                  {param.prefix === "$"
                    ? currencyFormatter.format(data.rent[param.name] ?? 0)
                    : `${param.prefix}${data.rent[param.name] ?? 0} ${param.suffix}`}
                </span>
              </div>
            ))}
            <div className={styles.parameter}>
              <span className={styles.bold}>TOTAL COST </span>
              {currencyFormatter.format(rentingCost)}
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <p className={styles.parameterHeader}>BUY</p>
          <div className={styles.parameterContainer}>
            {buyParameters.map((param, index) => (
              <div className={styles.parameter} key={`${param.name}-${index}`}>
                <span className={styles.bold}>{param.label} </span>
                <span>
                  {param.prefix === "$"
                    ? currencyFormatter.format(data.buy[param.name] ?? 0)
                    : `${param.prefix}${data.buy[param.name] ?? 0} ${param.suffix}`}
                </span>
              </div>
            ))}
            <div className={styles.parameter}>
              <span className={styles.bold}>TOTAL COST </span>
              {currencyFormatter.format(buyingCost)}
            </div>
          </div>
        </div>
      </div>
      <Results>
        Renting a house is{" "}
        <span className={styles.bold}>
          {Math.abs((100 * rentingCost) / buyingCost - 100).toFixed(2)}%{" "}
          {rentingCost > buyingCost ? "more expensive" : "cheaper"}
        </span>{" "}
        than buying it, if you are planning to stay for {data.rent.leaseDuration} months.
      </Results>

      <div className={styles.buttonContainer}>
        <button onClick={onClose}>Change Parameters</button>
      </div>
    </div>
  );
};

export default HouseFormResult;
