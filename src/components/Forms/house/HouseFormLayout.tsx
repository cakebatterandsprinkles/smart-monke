import type { FC } from "react";
import { ReactComponent as HouseIcon } from "../../../images/house.svg";
import styles from "../Form.module.css";
import HouseForm from "./HouseForm";

const HouseFormLayout: FC = () => (
  <div className={styles.houseBackground}>
    <div className={styles.mainWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.headingContainer}>
          <HouseIcon className={styles.icon} />
          <p className={styles.bannerHeading}>To rent or to buy?</p>
        </div>
        <HouseForm />

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

export default HouseFormLayout;
