import type { FC } from "react";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import type { LeaseFormModel } from "../../../data/car/lease";
import { leaseParameters } from "../../../data/car/lease";
import { ReactComponent as InfoIcon } from "../../../images/info.svg";
import styles from "../Form.module.css";

interface LeaseFormProps {
  value: LeaseFormModel;
  setValue: (fn: (model: LeaseFormModel) => LeaseFormModel) => void;
}

const LeaseForm: FC<LeaseFormProps> = ({ setValue, value }) => {
  return (
    <div className={styles.formContainer}>
      <p className={styles.mainHeader}>LEASE</p>
      {leaseParameters.map((param) => (
        <div className={styles.inputField} key={param.name}>
          <label htmlFor={param.name}>
            {param.label}
            {param.tooltipText ? (
              <div>
                <p className={styles.tooltip} data-for={param.name} data-tip="">
                  <InfoIcon />
                </p>
                <ReactTooltip getContent={(): string => param.tooltipText} id={param.name} />
              </div>
            ) : null}
          </label>
          <NumberFormat
            decimalScale={2}
            id={param.name}
            name={param.name}
            onValueChange={(values): void => {
              setValue((model) => ({
                ...model,
                [param.name]: values.floatValue,
              }));
            }}
            prefix={param.prefix}
            suffix={param.suffix}
            thousandSeparator={true}
            value={value[param.name]}
          />
        </div>
      ))}
    </div>
  );
};

export default LeaseForm;
