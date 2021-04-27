import type { FormEvent, FunctionComponent } from "react";
import { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { cashParameters, leaseParameters, loanParameters } from "../data/carForm";
import { ReactComponent as CarIcon } from "../images/truck.svg";
import styles from "./Form.module.css";
import Loader from "./Loader";
import Results from "./Results";

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
      "investmentReturn" | "leaseDuration" | "monthlyLeasePrice" | "residualPrice" | "salesTax",
      number | undefined
    >
  >({
    investmentReturn: undefined,
    leaseDuration: undefined,
    monthlyLeasePrice: undefined,
    residualPrice: undefined,
    salesTax: undefined,
  });
  const [totalCashCost, setTotalCashCost] = useState<number>();
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
          (loanFormModel.monthlyLoanPayment === undefined ||
            loanFormModel.salesTax === undefined ||
            loanFormModel.loanDuration === undefined ||
            loanFormModel.upfrontCosts === undefined ||
            leaseFormModel.salesTax === undefined ||
            leaseFormModel.leaseDuration === undefined ||
            leaseFormModel.residualPrice === undefined ||
            leaseFormModel.investmentReturn === undefined ||
            upfrontPayment === undefined ||
            taxesAndFees === undefined)) ||
        (paymentMethod === "Cash" &&
          (cashFormModel.salesPrice === undefined ||
            cashFormModel.salesTax === undefined ||
            cashFormModel.upfrontCosts === undefined ||
            leaseFormModel.monthlyLeasePrice === undefined ||
            leaseFormModel.salesTax === undefined ||
            leaseFormModel.leaseDuration === undefined ||
            leaseFormModel.residualPrice === undefined ||
            leaseFormModel.investmentReturn === undefined ||
            upfrontPayment === undefined ||
            taxesAndFees === undefined))
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
        if (
          cashFormModel.salesPrice !== undefined &&
          cashFormModel.salesTax !== undefined &&
          cashFormModel.upfrontCosts !== undefined
        ) {
          const cashCost =
            cashFormModel.salesPrice * (1 + cashFormModel.salesTax / 100) +
            cashFormModel.upfrontCosts;
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
                        {` ${param.prefix}${cashFormModel[param.name] ?? 0} ${param.suffix}`}
                      </div>
                    ))
                  : loanParameters.map((param, index) => (
                      <div className={styles.parameter} key={`${param.name}-${index}`}>
                        <span className={styles.bold}>{`${param.label}`}</span>
                        {` ${param.prefix}${loanFormModel[param.name] ?? 0} ${param.suffix}`}
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
                    {` ${param.prefix}${leaseFormModel[param.name] ?? 0} ${param.suffix}`}
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
