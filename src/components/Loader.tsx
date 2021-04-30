import type { FC } from "react";
import { useEffect, useState } from "react";

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

  return <div>{textArr[textIndex]}</div>;
};

export default Loader;
