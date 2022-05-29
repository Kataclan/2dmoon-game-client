import styles from "./Score.module.css";
import { FC, useMemo } from "react";
import { classNames } from "utils/classnames";

const Score: FC<{ score: number; metric?: "kmh" | "mph" }> = ({
  score,
  metric = "kmh",
}) => {
  const scoreClassname = useMemo(() => {
    if (score >= 30) {
      return styles.score_7;
    } else if (score > 25) {
      return styles.score_6;
    } else if (score > 20) {
      return styles.score_5;
    } else if (score > 15) {
      return styles.score_4;
    } else if (score > 10) {
      return styles.score_3;
    } else if (score > 5) {
      return styles.score_2;
    } else {
      return styles.score_1;
    }
  }, [score]);
  return (
    <div className={styles.container}>
      <span
        className={classNames(styles.score, scoreClassname)}
      >{`${score} ${metric}`}</span>
    </div>
  );
};

export default Score;
