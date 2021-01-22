import type { FormEvent, FunctionComponent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Mascot from "../images/IMG_0405.png";
import styles from "./Form.module.css";
import Layout from "./Layout";

const Form: FunctionComponent = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [dropdownBtnActive, setDropdownBtnActive] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    e.preventDefault();
    console.log(inputEl.current?.value);
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
          <input id="salesPrice" name="salesPrice" ref={inputEl} type="number" />
          <span className={styles.unit}>$</span>
        </div>
        <div className={styles.inputField}>
          <label htmlFor="salesTax">Sales Tax:</label>
          <input id="salesTax" name="salesTax" type="number" />
          <span className={styles.unit}>%</span>
        </div>
        <div className={styles.inputField}>
          <label htmlFor="upfrontCosts">Upfront Costs:</label>
          <input id="upfrontCosts" name="upfrontCosts" type="number" />
          <span className={styles.unit}>$</span>
        </div>
      </div>
    );
  };

  const renderLoanJSX = (): JSX.Element => {
    return (
      <div>
        <div className={styles.inputField}>
          <label htmlFor="loanInterest">Loan Interest:</label>
          <input id="loanInterest" name="loanInterest" ref={inputEl} type="number" />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="loanDuration">Loan Duration:</label>
          <input id="loanDuration" name="loanDuration" type="number" />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.banner}>
        <img alt="mascot" className={styles.img} src={Mascot} />
        <p>Want to know which one makes more sense for you?</p>
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
              <input id="leasePrice" name="leasePrice" type="number" />{" "}
              <span className={styles.unit}>$</span>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="salesTax">Sales Tax:</label>
              <input id="salesTax" name="salesTax" type="number" />{" "}
              <span className={styles.unit}>%</span>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="leaseDuration">Lease Duration:</label>
              <input id="leaseDuration" name="leaseDuration" type="number" />{" "}
              <span className={styles.unit}>mo</span>
            </div>
            <div className={styles.buttonAndFormWrapper}></div>
            <div className={styles.inputField}>
              <label htmlFor="residualPrice">Residual Price:</label>
              <input id="residualPrice" name="residualPrice" type="number" />{" "}
              <span className={styles.unit}>$</span>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="investmentReturn">Expected Yearly Investment Return:</label>
              <input id="investmentReturn" name="investmentReturn" type="number" />{" "}
              <span className={styles.unit}>$</span>
            </div>
            <div className={styles.wrapper}>Upfront Costs</div>
            <div className={styles.inputField}>
              <label htmlFor="upfrontPayment">Upfront Payment:</label>
              <input id="upfrontPayment" name="upfrontPayment" type="number" />
              <span className={styles.unit}>$</span>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="taxesAndFees">Taxes & Fees:</label>
              <input id="taxesAndFees" name="taxesAndFees" type="number" />
              <span className={styles.unit}>$</span>
            </div>
          </div>
          <div>
            <button type="submit">Calculate</button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Form;
