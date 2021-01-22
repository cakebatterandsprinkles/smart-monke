import type { FunctionComponent } from "react";
import { useRef } from "react";
import Mascot from "../images/IMG_0405.png";
import styles from "./Form.module.css";

const Form: FunctionComponent = () => {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleSubmit = (): void => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    console.log(inputEl.current);
  };

  return (
    <form>
      <div className={styles.mainContainer}>
        <div>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" ref={inputEl} type="text" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className={styles.field}>
            <label htmlFor="score">Score</label>
            <input id="score" name="score" type="number" />
          </div>
        </div>
        <img alt="mascot" className={styles.img} src={Mascot} />
        <div>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className={styles.field}>
            <label htmlFor="score">Score</label>
            <input id="score" name="score" type="number" />
          </div>
        </div>
        <div>
          <button onSubmit={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
