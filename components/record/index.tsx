import styles from "./Record.module.css";
import { FC, useEffect, useMemo, useState } from "react";
import { classNames } from "utils/classnames";
import { LOCAL_KEY_RECORD } from "config/local";

const RecordComponent: FC<{ record: number; metric?: "km/h" | "mph" }> = ({
  record,
  metric = "km/h",
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Your record:</span>
      <span className={styles.record}>{`${record} ${metric}`}</span>
    </div>
  );
};

const Record: FC = () => {
  const [record, setRecord] = useState(0);

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      setRecord(
        parseInt(window.localStorage.getItem(LOCAL_KEY_RECORD) || "") || 0
      );
    }
  });

  return <RecordComponent record={record} />;
};

export default Record;
