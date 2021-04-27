import type { FormEvent, FunctionComponent } from "react";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { calculateBuyCost, calculateRentCost } from "../calculators/house";
import { rentParameters } from "../data/houseForm";
import { ReactComponent as HouseIcon } from "../images/house.svg";
import styles from "./Form.module.css";
import Loader from "./Loader";
import Results from "./Results";

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

  const [salesPrice, setSalesPrice] = useState<number>();
  const [homeInsurance, setHomeInsurance] = useState<number>();
  const [propertyTax, setPropertyTax] = useState<number>();
  const [mortgageDuration, setMortgageDuration] = useState<number>();
  const [mortgageRate, setMortgageRate] = useState<number>();
  const [downPayment, setDownPayment] = useState<number>();
  const [mortgageInsurance, setMortgageInsurance] = useState<number>();
  const [hoa, setHoa] = useState<number>();
  const [upkeepCosts, setUpkeepCosts] = useState<number>();
  const [closingCosts, setClosingCosts] = useState<number>();
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
        salesPrice === undefined ||
        homeInsurance === undefined ||
        propertyTax === undefined ||
        mortgageDuration === undefined ||
        mortgageRate === undefined ||
        downPayment === undefined ||
        hoa === undefined ||
        mortgageInsurance === undefined ||
        upkeepCosts === undefined ||
        closingCosts === undefined
      ) {
        reject({ message: "Fill in the goddamn form will ya" });
      } else {
        resolve({ message: "Success" });
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

  const buyParameters = [
    {
      label: "Sales Price:",
      name: "salesPrice",
      changeHandler: setSalesPrice,
      prefix: "$",
      suffix: "",
      value: salesPrice,
    },
    {
      label: "Home Insurance:",
      name: "homeInsurance",
      changeHandler: setHomeInsurance,
      prefix: "$",
      suffix: "",
      value: homeInsurance,
    },
    {
      label: "Property Tax:",
      name: "propertyTax",
      changeHandler: setPropertyTax,
      prefix: "$",
      suffix: "",
      value: propertyTax,
    },
    {
      label: "Mortgage Duration:",
      name: "mortgageDuration",
      changeHandler: setMortgageDuration,
      prefix: "",
      suffix: " months",
      value: mortgageDuration,
    },
    {
      label: "Mortgage Rate:",
      name: "mortgageRate",
      changeHandler: setMortgageRate,
      prefix: "",
      suffix: " %",
      value: mortgageRate,
    },
    {
      label: "Down Payment:",
      name: "downPayment",
      changeHandler: setDownPayment,
      prefix: "$",
      suffix: "",
      value: downPayment,
    },
    {
      label: "⭕ Mortgage Insurance:",
      name: "mortgageInsurance",
      changeHandler: setMortgageInsurance,
      prefix: "$",
      suffix: "",
      value: mortgageInsurance,
    },
    {
      label: "Monthly HOA Payments:",
      name: "hoa",
      changeHandler: setHoa,
      prefix: "$",
      suffix: "",
      value: hoa,
    },
    {
      label: "Upkeep Costs: (~1%)",
      name: "upkeepCosts",
      changeHandler: setUpkeepCosts,
      prefix: "$",
      suffix: "",
      value: upkeepCosts,
    },
    {
      label: "Closing Costs:",
      name: "closingCosts",
      changeHandler: setClosingCosts,
      prefix: "$",
      suffix: "",
      value: closingCosts,
    },
  ];

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
                            param.changeHandler(values.floatValue ?? 0);
                          }}
                          prefix={param.prefix ? param.prefix : ""}
                          suffix={param.suffix ? param.suffix : ""}
                          thousandSeparator={true}
                          value={param.value}
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
                    {` ${param.prefix}${param.value ?? 0} ${param.suffix}`}
                  </div>
                ))}
                <div className={styles.parameter}>
                  <span className={styles.bold}>TOTAL COST</span>
                  {calculateBuyCost({
                    closingCosts: closingCosts ?? 0,
                    downPayment: downPayment ?? 0,
                    homeInsurance: homeInsurance ?? 0,
                    leaseMonths: rentFormModel.leaseDuration ?? 0,
                    monthlyHoaPayments: hoa ?? 0,
                    mortgageDuration: mortgageDuration ?? 0,
                    mortgageInsurance: mortgageInsurance ?? 0,
                    mortgageRate: mortgageRate ?? 0,
                    propertyTax: propertyTax ?? 0,
                    salesPrice: salesPrice ?? 0,
                    upkeepCosts: upkeepCosts ?? 0,
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
