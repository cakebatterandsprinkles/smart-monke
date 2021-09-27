import type { FC, FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CashFormModel } from "../../../data/car/cash";
import type { LeaseFormModel } from "../../../data/car/lease";
import type { LoanFormModel } from "../../../data/car/loan";
import { checkErrors } from "../../../util/checkErrors";
import Loader from "../../Loader/Loader";
import styles from "../Form.module.css";
import CarFormResult from "./CarFormResult";
import CashForm from "./CashForm";
import LeaseForm from "./LeaseForm";
import LoanForm from "./LoanForm";

const CarForm: FC = () => {
  const [cashFormModel, setCashFormModel] = useState<CashFormModel>({
    salesPrice: undefined,
    cashSalesTax: undefined,
    upfrontCashCosts: undefined,
  });

  const [loanFormModel, setLoanFormModel] = useState<LoanFormModel>({
    loanDuration: undefined,
    monthlyLoanPayment: undefined,
    loanSalesTax: undefined,
    upfrontLoanCosts: undefined,
  });

  const [leaseFormModel, setLeaseFormModel] = useState<LeaseFormModel>({
    investmentReturn: undefined,
    leaseDuration: undefined,
    monthlyLeasePrice: undefined,
    residualPrice: undefined,
    leaseSalesTax: undefined,
    upfrontLeasePayment: undefined,
    leaseTaxesAndFees: undefined,
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
            ...Object.values<number | undefined>(cashFormModel),
            ...Object.values<number | undefined>(leaseFormModel)
          )
        : checkErrors(
            ...Object.values<number | undefined>(loanFormModel),
            ...Object.values<number | undefined>(leaseFormModel)
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
                    className={paymentMethod === item ? styles.active : ""}
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
            {paymentMethod === "Cash" ? (
              <CashForm setValue={setCashFormModel} value={cashFormModel} />
            ) : (
              <LoanForm setValue={setLoanFormModel} value={loanFormModel} />
            )}
          </div>
        </div>
        <div>
          <LeaseForm setValue={setLeaseFormModel} value={leaseFormModel} />
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
      <CarFormResult
        data={{
          cash: cashFormModel,
          loan: loanFormModel,
          lease: leaseFormModel,
        }}
        onClose={(): void => {
          setResult(false);
        }}
        paymentMethod={paymentMethod}
      />
    );
  }
  return <div></div>;
};

export default CarForm;
