import type { FormEvent, FunctionComponent } from "react";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { calculateBuyCost, calculateRentCost } from "../../calculators/house";
import { buyParameters, rentParameters } from "../../data/houseForm";
import { ReactComponent as HouseIcon } from "../../images/house.svg";
import { checkErrors } from "../../util/checkErrors";
import Loader from "../Loader/Loader";
import Results from "../Results/Results";
import styles from "./Form.module.css";

const Form: FunctionComponent = () => {
  const [rentFormModel, setRentFormModel] = useState<
    Record<
      "investmentReturn" | "leaseDuration" | "monthlyRent" | "rentersInsurance" | "yearlyIncrease",
      number | undefined
    >
  >({
    investmentReturn: undefined,
    leaseDuration: undefined,
    monthlyRent: undefined,
    rentersInsurance: undefined,
    yearlyIncrease: undefined,
  });

  const [buyFormModel, setBuyFormModel] = useState<
    Record<
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
      | "yearlyPriceIncrease",
      number | undefined
    >
  >({
    salesPrice: undefined,
    homeInsurance: undefined,
    propertyTax: undefined,
    mortgageDuration: undefined,
    mortgageRate: undefined,
    downPayment: undefined,
    mortgageInsurance: undefined,
    hoa: undefined,
    upkeepCosts: undefined,
    closingCosts: undefined,
    yearlyPriceIncrease: undefined,
  });

  const [loader, setLoader] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [timeoutHandle, setTimeoutHandle] = useState<NodeJS.Timeout | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    checkErrors(
      ...Object.values<number | undefined>(rentFormModel),
      ...Object.values<number | undefined>(buyFormModel)
    )
      .then(() => {
        setLoader(true);
        if (!timeoutHandle) {
          setTimeoutHandle(
            setTimeout(() => {
              setLoader(false);
              setResult(true);
              setTimeoutHandle(null);
            }, 3000)
          );
        }
      })
      .catch(({ message }: { message: string }) => {
        toast.dark(message);
      });
  };

  useEffect(() => {
    return (): void => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [timeoutHandle]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const renderContent = (): JSX.Element => {
    if (!loader && !result) {
      return (
        <form className={styles.mainContainer} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <p className={styles.mainHeader}>RENT</p>
            <div>
              {rentParameters.map((param) => {
                return (
                  <div className={styles.inputField} key={param.label}>
                    <label htmlFor={param.name}>
                      {param.label}
                      {param.tooltipText ? (
                        <div>
                          <p className={styles.tooltip} data-for={param.name} data-tip="">
                            ⓘ
                          </p>
                          <ReactTooltip
                            getContent={(): string => param.tooltipText}
                            id={param.name}
                          />
                        </div>
                      ) : null}
                    </label>
                    <NumberFormat
                      decimalScale={2}
                      name={param.name}
                      onValueChange={(values): void => {
                        setRentFormModel((model) => ({
                          ...model,
                          [param.name]: values.floatValue,
                        }));
                      }}
                      prefix={param.prefix ? param.prefix : ""}
                      suffix={param.suffix ? param.suffix : ""}
                      thousandSeparator={true}
                      value={rentFormModel[param.name]}
                    />{" "}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className={styles.formContainer}>
              <p className={styles.mainHeader}>BUY</p>

              <div>
                {buyParameters.map((param) => {
                  return (
                    <div className={styles.inputWrapper} key={param.label}>
                      <div className={styles.inputField}>
                        <label htmlFor={param.name}>
                          {param.label}

                          {param.tooltipText ? (
                            <div>
                              <p className={styles.tooltip} data-for={param.name} data-tip="">
                                ⓘ
                              </p>
                              <ReactTooltip
                                getContent={(): string => param.tooltipText}
                                id={param.name}
                              />
                            </div>
                          ) : null}
                        </label>
                        <NumberFormat
                          decimalScale={2}
                          name={param.name}
                          onValueChange={(values): void => {
                            setBuyFormModel((model) => ({
                              ...model,
                              [param.name]: values.floatValue,
                            }));
                          }}
                          prefix={param.prefix ? param.prefix : ""}
                          suffix={param.suffix ? param.suffix : ""}
                          thousandSeparator={true}
                          value={buyFormModel[param.name]}
                        />{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit">Calculate</button>
            </div>
          </div>
        </form>
      );
    }
    if (loader && !result) {
      return <Loader />;
    }
    if (result) {
      const buyingCost = calculateBuyCost({
        closingCosts: buyFormModel.closingCosts ?? 0,
        downPayment: buyFormModel.downPayment ?? 0,
        homeInsurance: buyFormModel.homeInsurance ?? 0,
        leaseMonths: rentFormModel.leaseDuration ?? 0,
        monthlyHoaPayments: buyFormModel.hoa ?? 0,
        mortgageDuration: buyFormModel.mortgageDuration ?? 0,
        mortgageInsurance: buyFormModel.mortgageInsurance ?? 0,
        mortgageRate: buyFormModel.mortgageRate ?? 0,
        propertyTax: buyFormModel.propertyTax ?? 0,
        salesPrice: buyFormModel.salesPrice ?? 0,
        upkeepCosts: buyFormModel.upkeepCosts ?? 0,
        yearlyInvestmentReturn: rentFormModel.investmentReturn ?? 0,
        yearlyPriceIncrease: buyFormModel.yearlyPriceIncrease ?? 0,
      });

      const rentingCost = calculateRentCost({
        leaseMonths: rentFormModel.leaseDuration ?? 0,
        monthlyRent: rentFormModel.monthlyRent ?? 0,
        rentersInsurance: rentFormModel.rentersInsurance ?? 0,
        yearlyIncrease: rentFormModel.yearlyIncrease ?? 0,
        yearlyReturn: rentFormModel.investmentReturn ?? 0,
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
                        ? currencyFormatter.format(rentFormModel[param.name] ?? 0)
                        : `${param.prefix}${rentFormModel[param.name] ?? 0} ${param.suffix}`}
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
                        ? currencyFormatter.format(buyFormModel[param.name] ?? 0)
                        : `${param.prefix}${buyFormModel[param.name] ?? 0} ${param.suffix}`}
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
            than buying it, if you are planning to stay for {rentFormModel.leaseDuration} months.
          </Results>

          <div className={styles.buttonContainer}>
            <button
              onClick={(): void => {
                setResult(false);
              }}
            >
              Change Parameters
            </button>
          </div>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <div className={styles.houseBackground}>
      <div className={styles.mainWrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.headingContainer}>
            <HouseIcon className={styles.icon} />
            <p className={styles.bannerHeading}>To rent or to buy?</p>
          </div>
          {renderContent()}

          <div className={styles.disclaimer}>
            <strong>DISCLAIMER: </strong>
            All information on this site is intended for entertainment purposes only. All reasonable
            efforts have been made to ensure that the accuracy of the content at the time of
            preparation. Information presented is believed to be reliable but is subject to change
            at any time, and without notice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
