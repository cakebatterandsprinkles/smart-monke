import type { FC, ReactElement } from "react";
import { useCallback, useState } from "react";
import Logo from "../images/monke.png";
import "./animation.css";
import CarForm from "./CarForm";
import HouseForm from "./HouseForm";
import Landing from "./Landing";
import styles from "./Layout.module.css";

const Layout: FC = () => {
  const [chosenContent, setChosenContent] = useState("");
  const renderContent = useCallback((): ReactElement => {
    if (chosenContent === "") {
      return <Landing />;
    }

    if (chosenContent === "buy-or-lease") {
      return <CarForm />;
    }

    if (chosenContent === "rent-or-buy") {
      return <HouseForm />;
    }
    return <span />;
  }, [chosenContent]);

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
          <div className={styles.logoText}>SmartMonke</div>
        </div>
        <div className={styles.linkContainer}>
          <div
            className={styles.contentWrapper}
            onClick={(): void => {
              setStateAndRenderContent("buy-or-lease");
            }}
          >
            <div className={`anima ${styles.backgroundContainer ?? ""}`}></div>
            <div className={styles.textContainer}>Buy or Lease?</div>
          </div>
          <div
            className={styles.contentWrapper}
            onClick={(): void => {
              setStateAndRenderContent("rent-or-buy");
            }}
          >
            <div className={`anima ${styles.backgroundContainer ?? ""}`}></div>
            <div className={styles.textContainer}>Rent or Buy?</div>
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>{content}</div>
    </div>
  );
};

export default Layout;
