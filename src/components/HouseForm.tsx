import type { FormEvent, FunctionComponent } from "react";
import { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import styles from "./Form.module.css";

const Form: FunctionComponent = () => {
  const [salesPrice, setSalesPrice] = useState<number>();
  const [salesTaxBuy, setSalesTaxBuy] = useState<number>();
  const [upfrontCosts, setUpfrontCosts] = useState<number>();
  const [totalCashCost, setTotalCashCost] = useState<number>();
  const [loanInterest, setLoanInterest] = useState<number>();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    e.preventDefault();
    if (paymentMethod === "Cash") {
      console.group("BUY- Cash");
      console.log("Sales Price: $", salesPrice?.toLocaleString());
      console.log("Sales Tax:", salesTaxBuy, "%");
      console.log("Upfront Costs: $", upfrontCosts?.toLocaleString());
      console.log("TOTAL CASH COST: $", totalCashCost?.toLocaleString());
      console.groupEnd();
    }
    if (paymentMethod === "Loan") {
      console.group("BUY- Loan");
      console.log("Sales Price: $", salesPrice?.toLocaleString());
      console.log("Sales Tax:", salesTaxBuy, "%");
      console.log("Upfront Costs: $", upfrontCosts?.toLocaleString());
      console.log("TOTAL CASH COST: $", totalCashCost?.toLocaleString());
      console.groupEnd();
    }
    console.group("LEASE");
    console.log("Monthly Lease Price: $ ", salesTaxBuy?.toLocaleString());
    console.log("Sales Tax: %", salesTaxLease);
    console.log("Lease Duration:", leaseDuration, "months");
    console.log("Residual Price: $ ", residualPrice?.toLocaleString());
    console.log("Investment Return: $ ", investmentReturn?.toLocaleString());
    console.log("Upfront Payment: $ ", upfrontPayment?.toLocaleString());
    console.log("Taxes and Fees: $ ", taxesAndFees?.toLocaleString());
    console.groupEnd();

    if (salesPrice !== undefined && salesTaxBuy !== undefined && upfrontCosts !== undefined) {
      const cashCost = salesPrice * (1 + salesTaxBuy / 100) + upfrontCosts;
      setTotalCashCost(cashCost);
    }
  };

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
        <div className={styles.inputField}>
          <label htmlFor="salesPrice">Sales Price:</label>
          <NumberFormat
            decimalScale={2}
            name="salesPrice"
            onValueChange={(values): void => {
              setSalesPrice(values.floatValue);
            }}
            prefix="$"
            thousandSeparator={true}
            value={salesPrice}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="salesTax">Sales Tax:</label>
          <NumberFormat
            decimalScale={2}
            name="salesTax"
            onValueChange={(values): void => {
              setSalesTaxBuy(values.floatValue);
            }}
            suffix="%"
            thousandSeparator={true}
            value={salesTaxBuy}
          />{" "}
        </div>
        <div className={styles.inputField}>
          <label htmlFor="upfrontCosts">Upfront Costs:</label>
          <NumberFormat
            decimalScale={2}
            name="upfrontCosts"
            onValueChange={(values): void => {
              setUpfrontCosts(values.floatValue);
            }}
            prefix="$"
            thousandSeparator={true}
            value={upfrontCosts}
          />{" "}
        </div>
        <div className={styles.cashCostDiv}>
          Total Cash Cost: ${totalCashCost ? totalCashCost.toLocaleString() : 0}
        </div>
      </div>
    );
  };

  const renderLoanJSX = (): JSX.Element => {
    return (
      <div>
        <div className={styles.inputField}>
          <label htmlFor="loanInterest">Loan Interest:</label>
          <NumberFormat
            decimalScale={2}
            name="loanInterest"
            onValueChange={(values): void => {
              setLoanInterest(values.floatValue);
            }}
            prefix="$"
            thousandSeparator={true}
            value={loanInterest}
          />{" "}
        </div>
        <div className={styles.inputField}>
          <label htmlFor="loanDuration">Loan Duration:</label>
          <NumberFormat
            decimalScale={2}
            name="loanDuration"
            onValueChange={(values): void => {
              setLoanDuration(values.floatValue);
            }}
            suffix=" months"
            thousandSeparator={true}
            value={loanDuration}
          />{" "}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerTextWrapper}>
          <h1 className={styles.bannerHeading}>To rent or to buy?</h1>
          <p className={styles.bannerText}>Estimations</p>
        </div>
      </div>
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
                <p
                  className={paymentMethod === "Cash" ? styles.active : ""}
                  onClick={(): void => {
                    choosePayment("Cash");
                  }}
                >
                  Cash
                </p>
                <p
                  className={paymentMethod === "Loan" ? styles.active : ""}
                  onClick={(): void => {
                    choosePayment("Loan");
                  }}
                >
                  Loan
                </p>
              </div>
            </button>
            {paymentMethod === "Cash" ? renderCashJSX() : renderLoanJSX()}
          </div>
        </div>
        <div>
          <div className={styles.formContainer}>
            <p className={styles.mainHeader}>LEASE</p>
            <div className={styles.inputField}>
              <label htmlFor="leasePrice">Monthly Lease Price:</label>
              <NumberFormat
                decimalScale={2}
                name="monthlyLeasePrice"
                onValueChange={(values): void => {
                  setMonthlyLeasePrice(values.floatValue);
                }}
                prefix="$"
                thousandSeparator={true}
                value={monthlyLeasePrice}
              />{" "}
            </div>
            <div className={styles.inputField}>
              <label htmlFor="salesTax">Sales Tax:</label>
              <NumberFormat
                decimalScale={2}
                name="salesTaxLease"
                onValueChange={(values): void => {
                  setSalesTaxLease(values.floatValue);
                }}
                suffix="%"
                thousandSeparator={true}
                value={salesTaxLease}
              />{" "}
            </div>
            <div className={styles.inputField}>
              <label htmlFor="leaseDuration">Lease Duration:</label>
              <NumberFormat
                decimalScale={2}
                name="leaseDuration"
                onValueChange={(values): void => {
                  setLeaseDuration(values.floatValue);
                }}
                suffix=" months"
                thousandSeparator={true}
                value={leaseDuration}
              />{" "}
            </div>
            <div className={styles.buttonAndFormWrapper}></div>
            <div className={styles.inputField}>
              <label htmlFor="residualPrice">Residual Price:</label>
              <NumberFormat
                decimalScale={2}
                name="residualPrice"
                onValueChange={(values): void => {
                  setResidualPrice(values.floatValue);
                }}
                prefix="$"
                thousandSeparator={true}
                value={residualPrice}
              />{" "}
            </div>
            <div className={styles.inputField}>
              <label htmlFor="investmentReturn">Expected Yearly Investment Return:</label>
              <NumberFormat
                decimalScale={2}
                name="investmentReturn"
                onValueChange={(values): void => {
                  setInvestmentReturn(values.floatValue);
                }}
                prefix="$"
                thousandSeparator={true}
                value={investmentReturn}
              />{" "}
            </div>
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
          <div>
            <button type="submit">Calculate</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
