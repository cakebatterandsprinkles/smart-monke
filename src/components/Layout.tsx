import type { FC, ReactElement } from "react";
import { useCallback, useState } from "react";
import Logo from "../images/monke.png";
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
      <nav>
        <div
          className={styles.logoContainer}
          onClick={(): void => {
            setStateAndRenderContent("");
          }}
        >
          <img alt="monke logo" className={styles.monke} src={Logo} />
          <p className={styles.logoText}>SmartMonke</p>
        </div>
        <div
          className={styles.linkContainer}
          onClick={(): void => {
            setStateAndRenderContent("buy-or-lease");
          }}
        >
          <p className={styles.link}>Buy or Lease?</p>
        </div>
        <div
          className={styles.linkContainer}
          onClick={(): void => {
            setStateAndRenderContent("rent-or-buy");
          }}
        >
          <p className={styles.link}>Rent or Buy?</p>
        </div>
      </nav>
      <div className={styles.contentWrapper}>{content}</div>
    </div>
  );
};

export default Layout;
