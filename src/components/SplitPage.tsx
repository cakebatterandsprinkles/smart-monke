import type { FC } from "react";
import "./animation.css";
import styles from "./SplitPage.module.css";

interface SplitPageProps {
  header: string;
  style?: string;
  buttonText: string;
  slogan: string;
  onClickHandle: (arg: string) => void;
  onMouseOverHandle: () => void;
  className?: string;
}

const SplitPage: FC<SplitPageProps> = (props) => {
  return (
    <div
      className={`${styles.split ?? ""} ${props.style ?? ""} ${props.className ?? ""}`}
      onMouseOver={(): void => {
        props.onMouseOverHandle();
      }}
    >
      <div className={styles.backgroundContainer}>
        <div className={styles.contentContainer}>
          <p className={styles.header}>{props.slogan}</p>
          <button
            className={styles.button}
            onClick={(): void => {
              props.onClickHandle(props.header);
            }}
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitPage;
