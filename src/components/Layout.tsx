import type { FC } from "react";
import styles from "./Layout.module.css";

const Layout: FC = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>{props.children}</div>
    </div>
  );
};

export default Layout;
