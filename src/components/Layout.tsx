import type { FC, ReactElement } from "react";
import { Fragment, useCallback, useState } from "react";
import Logo from "../images/monke.png";
import "./animation.css";
import CarForm from "./CarForm";
import HouseForm from "./HouseForm";
import styles from "./Layout.module.css";
import SplitPage from "./SplitPage";

const Layout: FC = () => {
  const [chosenContent, setChosenContent] = useState("");
  const [mouseOverLeft, setMouseOverLeft] = useState(false);
  const [mouseOverRight, setMouseOverRight] = useState(false);
  const renderContent = useCallback((): ReactElement => {
    if (chosenContent === "") {
      return (
        <Fragment>
          <SplitPage
            buttonText="Calculate"
            className={mouseOverLeft ? styles.leftHover : mouseOverRight ? styles.rightHover : ""}
            header="buy-or-lease"
            onClickHandle={(): void => {
              setChosenContent("buy-or-lease");
            }}
            onMouseOverHandle={(): void => {
              setMouseOverLeft(true);
              setMouseOverRight(false);
            }}
            slogan="Buy or Lease?"
            style={styles.left}
          />
          <SplitPage
            buttonText="Calculate"
            className={mouseOverLeft ? styles.leftHover : mouseOverRight ? styles.rightHover : ""}
            header="rent-or-buy"
            onClickHandle={(): void => {
              setChosenContent("rent-or-buy");
            }}
            onMouseOverHandle={(): void => {
              setMouseOverLeft(false);
              setMouseOverRight(true);
            }}
            slogan="Rent or Buy?"
            style={styles.right}
          />
        </Fragment>
      );
    }

    if (chosenContent === "buy-or-lease") {
      return <CarForm />;
    }

    if (chosenContent === "rent-or-buy") {
      return <HouseForm />;
    }
    return <span />;
  }, [chosenContent, mouseOverLeft, mouseOverRight]);

  const setStateAndRenderContent = (value: string): void => {
    setChosenContent(value);
  };

  const content = renderContent();

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div
          className={styles.logoContainer}
          onClick={(): void => {
            setStateAndRenderContent("");
          }}
        >
          <img alt="monke logo" className={styles.monke} src={Logo} />
          <p className={styles.logoText}>SmartMonke</p>
        </div>
      </div>
      <div className={styles.contentContainer}>{content}</div>
    </div>
  );
};

export default Layout;
