import type { FC } from "react";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import type { CashFormModel } from "../../../data/car/cash";
import { cashParameters } from "../../../data/car/cash";
import { ReactComponent as InfoIcon } from "../../../images/info.svg";
import styles from "../Form.module.css";

interface CashFormProps {
  value: CashFormModel;
  setValue: (fn: (model: CashFormModel) => CashFormModel) => void;
}

const CashForm: FC<CashFormProps> = ({ setValue, value }) => {
  return (
    <div>
      {cashParameters.map((param) => (
        <div className={styles.inputField} key={`cash-${param.name}`}>
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
              setValue((model: CashFormModel) => ({
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

export default CashForm;
