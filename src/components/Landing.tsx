import type { FC } from "react";
import "./animation.css";
import styles from "./Landing.module.css";

const Landing: FC = () => {
  return (
    <div className={styles.contentWrapper}>
      <div className={`anima ${styles.backgroundContainer ?? ""}`}></div>
      <div className={styles.textContainer}>Monke Explanation</div>
    </div>
  );
};

export default Landing;
