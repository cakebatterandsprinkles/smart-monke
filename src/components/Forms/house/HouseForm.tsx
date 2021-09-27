import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import type { BuyParam } from "../../../data/house/buy";
import { buyParameters } from "../../../data/house/buy";
import type { RentParam } from "../../../data/house/rent";
import { rentParameters } from "../../../data/house/rent";
import { ReactComponent as InfoIcon } from "../../../images/info.svg";
import { checkErrors } from "../../../util/checkErrors";
import Loader from "../../Loader/Loader";
import styles from "../Form.module.css";
import HouseFormResult from "./HouseFormResult";

const HouseForm: FC = () => {
  const [rentFormModel, setRentFormModel] = useState<Record<RentParam, number | undefined>>({
    investmentReturn: undefined,
    leaseDuration: undefined,
    monthlyRent: undefined,
    rentersInsurance: undefined,
    yearlyIncrease: undefined,
  });

  const [buyFormModel, setBuyFormModel] = useState<Record<BuyParam, number | undefined>>({
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
                          <InfoIcon />
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
                              <InfoIcon />
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
    return (
      <HouseFormResult
        data={{ buy: buyFormModel, rent: rentFormModel }}
        onClose={(): void => {
          setResult(false);
        }}
      />
    );
  }

  return <div></div>;
};

export default HouseForm;
