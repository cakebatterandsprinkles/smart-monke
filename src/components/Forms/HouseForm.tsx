import type { FormEvent, FunctionComponent } from "react";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { calculateBuyCost, calculateRentCost } from "../../calculators/house";
import { buyParameters, rentParameters } from "../../data/houseForm";
import { ReactComponent as HouseIcon } from "../images/house.svg";
import Loader from "../Loader/Loader";
import Results from "../Results/Results";
import styles from "./Form.module.css";

const Form: FunctionComponent = () => {
  const [rentFormModel, setRentFormModel] = useState<
    Record<
      "investmentReturn" | "leaseDuration" | "monthlyRent" | "rentersInsurance",
      number | undefined
    >
  >({
    investmentReturn: undefined,
    leaseDuration: undefined,
    monthlyRent: undefined,
    rentersInsurance: undefined,
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
      | "upkeepCosts",
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
  });

  const [loader, setLoader] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [timeoutHandle, setTimeoutHandle] = useState<NodeJS.Timeout | null>(null);

  const checkErrors = (): Promise<{ message: string }> =>
    new Promise((resolve, reject) => {
      if (
        rentFormModel.monthlyRent === undefined ||
        rentFormModel.leaseDuration === undefined ||
        rentFormModel.rentersInsurance === undefined ||
        rentFormModel.investmentReturn === undefined ||
        buyFormModel.salesPrice === undefined ||
        buyFormModel.homeInsurance === undefined ||
        buyFormModel.propertyTax === undefined ||
        buyFormModel.mortgageDuration === undefined ||
        buyFormModel.mortgageRate === undefined ||
        buyFormModel.downPayment === undefined ||
        buyFormModel.hoa === undefined ||
        buyFormModel.mortgageInsurance === undefined ||
        buyFormModel.upkeepCosts === undefined ||
        buyFormModel.closingCosts === undefined
      ) {
        reject({ message: "Fill in the goddamn form will ya" });
      } else {
        resolve({ message: "Success!" });
      }
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    checkErrors()
      .then(() => {
        setLoader(true);
        if (!timeoutHandle) {
          setTimeoutHandle(
            setTimeout(() => {
              setLoader(false);
              setResult(true);
            }, 5000)
          );
        }
      })
      .catch(({ message }: { message: string }) => {
        toast.dark(message);
      });
  };

  useEffect(() => {
    return (): void => {
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [timeoutHandle]);

  const renderContent = (): JSX.Element => {
    if (!loader && !result) {
      return (
        <form className={styles.mainContainer} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <p className={styles.mainHeader}>RENT</p>
            <div>
              {rentParameters.map((param, index) => {
                return (
                  <div className={styles.inputField} key={`${param.label}-${index}`}>
                    <label htmlFor={param.name}>{param.label}</label>
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
                {buyParameters.map((param, index) => {
                  return (
                    <div className={styles.inputWrapper} key={`${param.label}-${index}`}>
                      <div className={styles.inputField}>
                        <label htmlFor={param.name}>{param.label}</label>
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
      return (
        <div className={styles.mainResultsContainer}>
          <div className={styles.parameterWrapper}>
            <div className={styles.formContainer}>
              <p className={styles.parameterHeader}>RENT</p>
              <div className={styles.parameterContainer}>
                {rentParameters.map((param, index) => (
                  <div className={styles.parameter} key={`${param.name}-${index}`}>
                    <span className={styles.bold}>{`${param.label}`}</span>
                    {` ${param.prefix}${rentFormModel[param.name] ?? 0} ${param.suffix}`}
                  </div>
                ))}
                <div className={styles.parameter}>
                  <span className={styles.bold}>TOTAL COST</span>
                  {calculateRentCost({
                    leaseMonths: rentFormModel.leaseDuration ?? 0,
                    monthlyRent: rentFormModel.monthlyRent ?? 0,
                    rentersInsurance: rentFormModel.rentersInsurance ?? 0,
                    yearlyIncrease: 6,
                    yearlyReturn: rentFormModel.investmentReturn ?? 0,
                  })}
                </div>
              </div>
            </div>
            <div className={styles.formContainer}>
              <p className={styles.parameterHeader}>BUY</p>
              <div className={styles.parameterContainer}>
                {buyParameters.map((param, index) => (
                  <div className={styles.parameter} key={`${param.name}-${index}`}>
                    <span className={styles.bold}>{`${param.label}`}</span>
                    {` ${param.prefix}${buyFormModel[param.name] ?? 0} ${param.suffix}`}
                  </div>
                ))}
                <div className={styles.parameter}>
                  <span className={styles.bold}>TOTAL COST</span>
                  {calculateBuyCost({
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
                    yearlyPriceIncrease: 4,
                  })}
                </div>
              </div>
            </div>
          </div>
          <Results>Hi</Results>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.headingContainer}>
          <HouseIcon className={styles.icon} />
          <p className={styles.bannerHeading}>To rent or to buy?</p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Form;
