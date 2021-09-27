import type { FC } from "react";
import { ReactComponent as CarIcon } from "../../../images/truck.svg";
import styles from "../Form.module.css";
import CarForm from "./CarForm";

const CarFormLayout: FC = () => (
  <div className={styles.carBackground}>
    <div className={styles.mainWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.headingContainer}>
          <CarIcon className={styles.icon} />
          <p className={styles.bannerHeading}>To buy or to lease?</p>
        </div>
        <CarForm />
        <div className={styles.disclaimer}>
          <strong>DISCLAIMER: </strong>
          All information on this site is intended for entertainment purposes only. All reasonable
          efforts have been made to ensure that the accuracy of the content at the time of
          preparation. Information presented is believed to be reliable but is subject to change at
          any time, and without notice.
        </div>
      </div>
    </div>
  </div>
);

export default CarFormLayout;
