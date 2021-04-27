import type { FC } from "react";
import { Fragment, useState } from "react";
import styles from "../Layout/Layout.module.css";
import SplitPage from "../SplitPage/SplitPage";

const Landing: FC = () => {
  const [mouseOverLeft, setMouseOverLeft] = useState<boolean>(false);
  const [mouseOverRight, setMouseOverRight] = useState<boolean>(false);
  return (
    <Fragment>
      <SplitPage
        buttonText="Calculate"
        className={mouseOverLeft ? styles.leftHover : mouseOverRight ? styles.rightHover : ""}
        emoji="car"
        header="buy-or-lease"
        onMouseOverHandle={(): void => {
          setMouseOverLeft(true);
          setMouseOverRight(false);
        }}
        slogan="Buy or Lease?"
        style={styles.left}
        subtext="Not sure leasing or buying a car is better in your specific situation?"
      />
      <SplitPage
        buttonText="Calculate"
        className={mouseOverLeft ? styles.leftHover : mouseOverRight ? styles.rightHover : ""}
        emoji="house"
        header="rent-or-buy"
        onMouseOverHandle={(): void => {
          setMouseOverLeft(false);
          setMouseOverRight(true);
        }}
        slogan="Rent or Buy?"
        style={styles.right}
        subtext="Not sure renting or buying a house is better in your specific situation?"
      />
    </Fragment>
  );
};

export default Landing;
