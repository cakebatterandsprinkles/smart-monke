import type { FormEvent, FunctionComponent } from "react";
import { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { ReactComponent as CarIcon } from "../images/truck.svg";
import styles from "./Form.module.css";
import Loader from "./Loader";
import Results from "./Results";

const Form: FunctionComponent = () => {
  const [salesPrice, setSalesPrice] = useState<number>();
  const [salesTaxBuy, setSalesTaxBuy] = useState<number>();
  const [upfrontCosts, setUpfrontCosts] = useState<number>();
  const [totalCashCost, setTotalCashCost] = useState<number>();
  const [monthlyLoanPayment, setMonthlyLoanPayment] = useState<number>();
  const [loanDuration, setLoanDuration] = useState<number>();
  const [monthlyLeasePrice, setMonthlyLeasePrice] = useState<number>();
  const [salesTaxLease, setSalesTaxLease] = useState<number>();
  const [leaseDuration, setLeaseDuration] = useState<number>();
  const [residualPrice, setResidualPrice] = useState<number>();
  const [investmentReturn, setInvestmentReturn] = useState<number>();
  const [upfrontPayment, setUpfrontPayment] = useState<number>();
  const [taxesAndFees, setTaxesAndFees] = useState<number>();
  const [dropdownBtnActive, setDropdownBtnActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loader, setLoader] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [timeoutHandle, setTimeoutHandle] = useState<NodeJS.Timeout | null>(null);

  const checkErrors = (): Promise<{ message: string }> =>
    new Promise((resolve, reject) => {
      if (
        (paymentMethod === "Loan" &&
          (!monthlyLoanPayment ||
            !salesTaxBuy ||
            !loanDuration ||
            !upfrontCosts ||
            !salesTaxLease ||
            !leaseDuration ||
            !residualPrice ||
            !investmentReturn ||
            !upfrontPayment ||
            !taxesAndFees)) ||
        (paymentMethod === "Cash" &&
          (!salesPrice ||
            !salesTaxBuy ||
            !upfrontCosts ||
            !monthlyLeasePrice ||
            !salesTaxLease ||
            !leaseDuration ||
            !residualPrice ||
            !investmentReturn ||
            !upfrontPayment ||
            !taxesAndFees))
      ) {
        reject({ message: "Fill in the goddamn form will ya" });
      } else {
        resolve({ message: "Success" });
      }
    });

  const cashParameters = [
    {
      label: "Sales Price:",
      name: "salesPrice",
      changeHandler: setSalesPrice,
      prefix: "$",
      suffix: "",
      value: salesPrice,
    },
    {
      label: "Sales Tax:",
      name: "salesTax",
      changeHandler: setSalesTaxBuy,
      prefix: "",
      suffix: "%",
      value: salesTaxBuy,
    },
    {
      label: "Upfront Costs:",
      name: "upfrontCosts",
      changeHandler: setUpfrontCosts,
      prefix: "$",
      suffix: "",
      value: upfrontCosts,
    },
  ];
  const loanParameters = [
    {
      label: "Monthly Loan Payment:",
      name: "monthlyLoanPayment",
      changeHandler: setMonthlyLoanPayment,
      prefix: "$",
      suffix: "",
      value: monthlyLoanPayment,
    },
    {
      label: "Loan Duration:",
      name: "loanDuration",
      changeHandler: setLoanDuration,
      prefix: "",
      suffix: " months",
      value: loanDuration,
    },
    {
      label: "Sales Tax:",
      name: "salesTax",
      changeHandler: setSalesTaxBuy,
      prefix: "",
      suffix: "%",
      value: salesTaxBuy,
    },
    {
      label: "Down Payment:",
      name: "upfrontcosts",
      changeHandler: setUpfrontCosts,
      prefix: "$",
      suffix: "",
      value: upfrontCosts,
    },
  ];
  const leaseParameters = [
    {
      label: "Monthly Lease Price:",
      name: "monthlyLeasePrice",
      changeHandler: setMonthlyLeasePrice,
      prefix: "$",
      suffix: "",
      value: monthlyLeasePrice,
    },
    {
      label: "Sales Tax:",
      name: "salesTax",
      changeHandler: setSalesTaxLease,
      prefix: "",
      suffix: "%",
      value: salesTaxLease,
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
      label: "Residual Price:",
      name: "residualPrice",
      changeHandler: setResidualPrice,
      prefix: "$",
      suffix: "",
      value: residualPrice,
    },
    {
      label: "Yearly Investment Return:",
      name: "investmentReturn",
      changeHandler: setInvestmentReturn,
      prefix: "",
      suffix: "%",
      value: investmentReturn,
    },
  ];

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
        if (salesPrice !== undefined && salesTaxBuy !== undefined && upfrontCosts !== undefined) {
          const cashCost = salesPrice * (1 + salesTaxBuy / 100) + upfrontCosts;
          setTotalCashCost(cashCost);
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

  const handleDropdownClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    dropdownBtnActive ? setDropdownBtnActive(false) : setDropdownBtnActive(true);
    e.stopPropagation();
  };

  const closeDropdown = useCallback((): void => {
    setDropdownBtnActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return (): void => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [closeDropdown]);

  const choosePayment = (payment: string): void => {
    setPaymentMethod(payment);
  };

  const renderCashJSX = (): JSX.Element => {
    return (
      <div>
        {cashParameters.map((param) => (
          <div className={styles.inputField} key={param.name}>
            <label htmlFor="salesPrice">{param.label}</label>
            <NumberFormat
              decimalScale={2}
              name={param.name}
              onValueChange={(values): void => {
                param.changeHandler(values.floatValue);
              }}
              prefix={param.prefix}
              suffix={param.suffix}
              thousandSeparator={true}
              value={param.value}
            />
          </div>
        ))}
        <div className={styles.cashCostDiv}>
          Total Cash Cost: ${totalCashCost ? totalCashCost.toLocaleString() : 0}
        </div>
      </div>
    );
  };

  const renderLoanJSX = (): JSX.Element => {
    return (
      <div>
        {loanParameters.map((param) => (
          <div className={styles.inputField} key={param.name}>
            <label htmlFor="salesPrice">{param.label}</label>
            <NumberFormat
              decimalScale={2}
              name={param.name}
              onValueChange={(values): void => {
                param.changeHandler(values.floatValue);
              }}
              prefix={param.prefix}
              suffix={param.suffix}
              thousandSeparator={true}
              value={param.value}
            />
          </div>
        ))}
        <div className={styles.cashCostDiv}>Total Loan Cost:</div>
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    if (!loader && !result) {
      return (
        <form className={styles.mainContainer} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <p className={styles.mainHeader}>BUY</p>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn} onClick={handleDropdownClick} type="button">
                <span className={styles.title}>Payment Method: </span>
                <span>
                  {paymentMethod}
                  <span className={styles.dropIcon}> ▼</span>
                </span>
                <div
                  className={
                    dropdownBtnActive ? styles.dropdownContentActive : styles.dropdownContent
                  }
                >
                  {["Cash", "Loan"].map((item) => (
                    <p
                      className={paymentMethod === "Cash" ? styles.active : ""}
                      key={item}
                      onClick={(): void => {
                        choosePayment(item);
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </button>
              {paymentMethod === "Cash" ? renderCashJSX() : renderLoanJSX()}
            </div>
          </div>
          <div>
            <div className={styles.formContainer}>
              <p className={styles.mainHeader}>LEASE</p>
              {leaseParameters.map((param) => (
                <div className={styles.inputField} key={param.name}>
                  <label htmlFor="salesPrice">{param.label}</label>
                  <NumberFormat
                    decimalScale={2}
                    name={param.name}
                    onValueChange={(values): void => {
                      param.changeHandler(values.floatValue);
                    }}
                    prefix={param.prefix}
                    suffix={param.suffix}
                    thousandSeparator={true}
                    value={param.value}
                  />
                </div>
              ))}
              <div className={styles.wrapper}>Upfront Costs</div>
              <div className={styles.inputField}>
                <label htmlFor="upfrontPayment">Upfront Payment:</label>
                <NumberFormat
                  decimalScale={2}
                  name="upfrontPayment"
                  onValueChange={(values): void => {
                    setUpfrontPayment(values.floatValue);
                  }}
                  prefix="$"
                  thousandSeparator={true}
                  value={upfrontPayment}
                />{" "}
              </div>
              <div className={styles.inputField}>
                <label htmlFor="taxesAndFees">Taxes & Fees:</label>
                <NumberFormat
                  decimalScale={2}
                  name="taxesAndFees"
                  onValueChange={(values): void => {
                    setTaxesAndFees(values.floatValue);
                  }}
                  prefix="$"
                  thousandSeparator={true}
                  value={taxesAndFees}
                />{" "}
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
              <p className={styles.parameterHeader}>{paymentMethod.toUpperCase()}</p>
              <div className={styles.parameterContainer}>
                {paymentMethod === "Cash"
                  ? cashParameters.map((param, index) => (
                      <div className={styles.parameter} key={`${param.name}-${index}`}>
                        <span className={styles.bold}>{`${param.label}`}</span>
                        {` ${param.prefix}${param.value ?? 0} ${param.suffix}`}
                      </div>
                    ))
                  : loanParameters.map((param, index) => (
                      <div className={styles.parameter} key={`${param.name}-${index}`}>
                        <span className={styles.bold}>{`${param.label}`}</span>
                        {` ${param.prefix}${param.value ?? 0} ${param.suffix}`}
                      </div>
                    ))}
                <div className={styles.parameter}>
                  <span className={styles.bold}>Total Cash Cost:</span>
                  {` ${totalCashCost ?? 0}`}
                </div>
              </div>
            </div>
            <div className={styles.formContainer}>
              <p className={styles.parameterHeader}>LEASE</p>
              <div className={styles.parameterContainer}>
                {leaseParameters.map((param, index) => (
                  <div className={styles.parameter} key={`${param.name}-${index}`}>
                    <span className={styles.bold}>{`${param.label}`}</span>
                    {` ${param.prefix}${param.value ?? 0} ${param.suffix}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Results>hi</Results>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.headingContainer}>
          <CarIcon className={styles.icon} />
          <p className={styles.bannerHeading}>To buy or to lease?</p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Form;
