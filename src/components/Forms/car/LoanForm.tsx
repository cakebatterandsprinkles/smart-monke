import type { FC } from "react";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import type { LoanFormModel } from "../../../data/car/loan";
import { loanParameters } from "../../../data/car/loan";
import { ReactComponent as InfoIcon } from "../../../images/info.svg";
import styles from "../Form.module.css";

interface LoanFormProps {
  value: LoanFormModel;
  setValue: (fn: (model: LoanFormModel) => LoanFormModel) => void;
}

const LoanForm: FC<LoanFormProps> = ({ setValue, value }) => {
  return (
    <div>
      {loanParameters.map((param) => (
        <div className={styles.inputField} key={`loan-${param.name}`}>
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

export default LoanForm;
