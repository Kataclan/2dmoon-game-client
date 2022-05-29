import { FC } from "react";
import styles from "../styles/Home.module.css";

const Score: FC<{ score: number; metric?: "kmh" | "mph" }> = ({
  score,
  metric = "kmh",
}) => <div className={styles.score}></div>;
