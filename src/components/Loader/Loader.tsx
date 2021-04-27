import type { FC } from "react";
import { useEffect, useState } from "react";
import Logo from "../../images/monke.png";
import styles from "./Loader.module.css";

const textArr: string[] = [
  "Monkes are working",
  "Monkes are working.",
  "Monkes are working..",
  "Monkes are working...",
  "Monkes are working...🍌",
];

const Loader: FC = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      setTextIndex((index) => (index + 1) % textArr.length);
    }, 500);
    return (): void => {
      clearInterval(handle);
    };
  }, []);

  return (
    <div className={styles.mainLoaderContainer}>
      <img alt="monke logo" className={styles.monkeyIcon} src={Logo} />
      <p className={styles.text}>{textArr[textIndex]}</p>
    </div>
  );
};

export default Loader;
