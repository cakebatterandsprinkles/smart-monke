import type { FC, ReactElement } from "react";
import { useCallback } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../images/monke.png";
import { ReactComponent as Star } from "../../images/star.svg";
import "../animation.css";
import CarForm from "../forms/car/CarFormLayout";
import HouseForm from "../forms/house/HouseFormLayout";
import Landing from "../Landing/Landing";
import styles from "./Layout.module.css";

const Layout: FC = () => {
  const renderContent = useCallback((): ReactElement => {
    return (
      <Switch>
        <Route component={HouseForm} exact path="/rent-or-buy" />
        <Route component={CarForm} exact path="/buy-or-lease" />
        <Route component={Landing} exact path="/" />
        <Redirect to="/" />
      </Switch>
    );
  }, []);

  const content = renderContent();

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link className={styles.logoContainer} to="/">
          <img alt="monke logo" className={styles.monke} src={Logo} />
          <p className={styles.logoText}>SmartMonke</p>
        </Link>
      </div>
      <div className={styles.contentContainer}>{content}</div>
      <div className={styles.footer}>
        <Star className={styles.icon} />
        <p className={styles.linkTitle}>Made by:</p>{" "}
        <a className={styles.link} href="https://innermonke.com">
          InnerMonke LLC
        </a>
      </div>
      <ToastContainer
        closeOnClick
        draggable
        newestOnTop={false}
        pauseOnFocusLoss={false}
        position="top-center"
        rtl={false}
      />
    </div>
  );
};

export default Layout;
