import type { FormEvent, FunctionComponent } from "react";
import { Fragment, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ReactComponent as HouseIcon } from "../images/house.svg";
import styles from "./Form.module.css";
import Loader from "./Loader";
import Results from "./Results";

const Form: FunctionComponent = () => {
  const [monthlyRent, setMonthlyRent] = useState<number>();
  const [leaseDuration, setLeaseDuration] = useState<number>();
  const [rentersInsurance, setRentersInsurance] = useState<number>();
  const [investmentReturn, setInvestmentReturn] = useState<number>();
  const [salesPrice, setSalesPrice] = useState<number>();
  const [totalCashCost, setTotalCashCost] = useState<number>();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoader(true);
    if (!timeoutHandle) {
      setTimeoutHandle(
        setTimeout(() => {
          setLoader(false);
          setResult(true);
        }, 5000)
      );
    }
    console.group("BUY");
    // console.log("Monthly Lease Price: $ ", salesTaxBuy?.toLocaleString());
    // console.log("Sales Tax: %", salesTaxLease);
    // console.log("Lease Duration:", leaseDuration, "months");
    // console.log("Residual Price: $ ", residualPrice?.toLocaleString());
    // console.log("Investment Return: $ ", investmentReturn?.toLocaleString());
    // console.log("Upfront Payment: $ ", upfrontPayment?.toLocaleString());
    // console.log("Taxes and Fees: $ ", taxesAndFees?.toLocaleString());
    console.groupEnd();
    setTotalCashCost(0);
    setMortgageInsurance(0);
  };

  useEffect(() => {
    return (): void => {
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [timeoutHandle]);

  const rentParameters = [
    {
      label: "Monthly rent:",
      name: "monthlyRent",
      changeHandler: setMonthlyRent,
      prefix: "$",
      suffix: "",
      value: monthlyRent,
    },
    {
      label: "Lease Duration:",
      name: "leaseDuration",
      changeHandler: setLeaseDuration,
      prefix: "",
      suffix: " months",
      value: leaseDuration,
    },
    {
      label: "Renters insurance:",
      name: "rentersInsurance",
      changeHandler: setRentersInsurance,
      prefix: "$",
      suffix: "",
      value: rentersInsurance,
    },
    {
      label: "Investment Return:",
      name: "investmentReturn",
      changeHandler: setInvestmentReturn,
      prefix: "$",
      suffix: "",
      value: investmentReturn,
    },
  ];

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
                        param.changeHandler(values.floatValue ?? 0);
                      }}
                      prefix={param.prefix ? param.prefix : ""}
                      suffix={param.suffix ? param.suffix : ""}
                      thousandSeparator={true}
                      value={param.value}
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
        <Fragment>
          <div className={styles.parameterWrapper}>
            <div className={styles.formContainer}>
              {rentParameters.map((param, index) => (
                <div className={styles.parameter} key={`${param.name}-${index}`}>
                  <span className={styles.bold}>{`${param.label}`}</span>
                  {`${param.prefix} ${param.value ?? 0} ${param.suffix}`}
                </div>
              ))}
              <div className={styles.parameter}>
                <span className={styles.bold}>Total Cash Cost:</span>
                {totalCashCost}
              </div>
            </div>
            <div className={styles.formContainer}>
              {buyParameters.map((param, index) => (
                <div className={styles.parameter} key={`${param.name}-${index}`}>
                  <span className={styles.bold}>{`${param.label}`}</span>
                  {` ${param.prefix}${param.value ?? 0} ${param.suffix}`}
                </div>
              ))}
            </div>
          </div>
          <Results />
        </Fragment>
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
