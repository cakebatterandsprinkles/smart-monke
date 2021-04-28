import type { FormEvent, FunctionComponent } from "react";
import { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { calculateCashCost, calculateLeaseCost, calculateLoanCost } from "../../calculators/car";
import { cashParameters, leaseParameters, loanParameters } from "../../data/carForm";
import { ReactComponent as CarIcon } from "../../images/truck.svg";
import { checkErrors } from "../../util/checkErrors";
import Loader from "../Loader/Loader";
import Results from "../Results/Results";
import styles from "./Form.module.css";

const Form: FunctionComponent = () => {
  const [cashFormModel, setCashFormModel] = useState<
    Record<"salesPrice" | "salesTax" | "upfrontCosts", number | undefined>
  >({
    salesPrice: undefined,
    salesTax: undefined,
    upfrontCosts: undefined,
  });

  const [loanFormModel, setLoanFormModel] = useState<
    Record<"loanDuration" | "monthlyLoanPayment" | "salesTax" | "upfrontCosts", number | undefined>
  >({
    loanDuration: undefined,
    monthlyLoanPayment: undefined,
    salesTax: undefined,
    upfrontCosts: undefined,
  });

  const [leaseFormModel, setLeaseFormModel] = useState<
    Record<
      | "investmentReturn"
      | "leaseDuration"
      | "monthlyLeasePrice"
      | "residualPrice"
      | "salesTax"
      | "taxesAndFees"
      | "upfrontPayment",
      number | undefined
    >
  >({
    investmentReturn: undefined,
    leaseDuration: undefined,
    monthlyLeasePrice: undefined,
    residualPrice: undefined,
    salesTax: undefined,
    upfrontPayment: undefined,
    taxesAndFees: undefined,
  });
  const [dropdownBtnActive, setDropdownBtnActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loader, setLoader] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [timeoutHandle, setTimeoutHandle] = useState<NodeJS.Timeout | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const validation =
      paymentMethod === "Cash"
        ? checkErrors(
            cashFormModel.salesPrice,
            cashFormModel.salesTax,
            cashFormModel.upfrontCosts,
            leaseFormModel.monthlyLeasePrice,
            leaseFormModel.salesTax,
            leaseFormModel.leaseDuration,
            leaseFormModel.residualPrice,
            leaseFormModel.investmentReturn,
            leaseFormModel.upfrontPayment,
            leaseFormModel.taxesAndFees
          )
        : checkErrors(
            loanFormModel.monthlyLoanPayment,
            loanFormModel.salesTax,
            loanFormModel.loanDuration,
            loanFormModel.upfrontCosts,
            leaseFormModel.salesTax,
            leaseFormModel.leaseDuration,
            leaseFormModel.residualPrice,
            leaseFormModel.investmentReturn,
            leaseFormModel.upfrontPayment,
            leaseFormModel.taxesAndFees
          );

    validation
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
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [timeoutHandle]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

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
                setCashFormModel((model) => ({
                  ...model,
                  [param.name]: values.floatValue,
                }));
              }}
              prefix={param.prefix}
              suffix={param.suffix}
              thousandSeparator={true}
              value={cashFormModel[param.name]}
            />
          </div>
        ))}
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
                setLoanFormModel((model) => ({
                  ...model,
                  [param.name]: values.floatValue,
                }));
              }}
              prefix={param.prefix}
              suffix={param.suffix}
              thousandSeparator={true}
              value={loanFormModel[param.name]}
            />
          </div>
        ))}
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
                      setLeaseFormModel((model) => ({
                        ...model,
                        [param.name]: values.floatValue,
                      }));
                    }}
                    prefix={param.prefix}
                    suffix={param.suffix}
                    thousandSeparator={true}
                    value={leaseFormModel[param.name]}
                  />
                </div>
              ))}
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
      const cashCost = calculateCashCost({
        salesPrice: cashFormModel.salesPrice ?? 0,
        salesTax: cashFormModel.salesTax ?? 0,
        upfrontCost: cashFormModel.upfrontCosts ?? 0,
      });

      const loanCost = calculateLoanCost({
        loanDuration: loanFormModel.loanDuration ?? 0,
        monthlyLoanPayment: loanFormModel.monthlyLoanPayment ?? 0,
        salesTax: loanFormModel.salesTax ?? 0,
        downPayment: loanFormModel.upfrontCosts ?? 0,
        yearlyReturn: leaseFormModel.investmentReturn ?? 0,
      });

      const leaseCost = calculateLeaseCost({
        salesTax: leaseFormModel.salesTax ?? 0,
        yearlyReturn: leaseFormModel.investmentReturn ?? 0,
        leaseMonths: leaseFormModel.leaseDuration ?? 0,
        monthlyLeasePrice: leaseFormModel.monthlyLeasePrice ?? 0,
        residualPrice: leaseFormModel.residualPrice ?? 0,
        taxesAndFees: leaseFormModel.taxesAndFees ?? 0,
        upfrontPayment: leaseFormModel.upfrontPayment ?? 0,
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
                            ? currencyFormatter.format(cashFormModel[param.name] ?? 0)
                            : `${param.prefix}${cashFormModel[param.name] ?? 0} ${param.suffix}`}
                        </span>
                      </div>
                    ))
                  : loanParameters.map((param, index) => (
                      <div className={styles.parameter} key={`${param.name}-${index}`}>
                        <span className={styles.bold}>{`${param.label}`}</span>
                        <span>
                          {param.prefix === "$"
                            ? currencyFormatter.format(loanFormModel[param.name] ?? 0)
                            : `${param.prefix}${loanFormModel[param.name] ?? 0} ${param.suffix}`}
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
                    <span className={styles.bold}>{`${param.label}`}</span>
                    <span>
                      {param.prefix === "$"
                        ? currencyFormatter.format(leaseFormModel[param.name] ?? 0)
                        : `${param.prefix}${leaseFormModel[param.name] ?? 0} ${param.suffix}`}
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
            {" "}
            Buying this car is{" "}
            <span className={styles.bold}>
              {Math.abs((100 * buyCost) / leaseCost - 100).toFixed(2)}%{" "}
              {buyCost > leaseCost ? "more expensive" : "cheaper"}
            </span>{" "}
            than leasing it.
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
    <div className={styles.carBackground}>
      <div className={styles.mainWrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.headingContainer}>
            <CarIcon className={styles.icon} />
            <p className={styles.bannerHeading}>To buy or to lease?</p>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Form;
