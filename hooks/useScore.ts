import { LOCAL_KEY_HITS, LOCAL_KEY_RECORD } from "config/local";
import { useState } from "react";

export default () => {
  const [score, handleSetScore] = useState(0);

  const setScore = (score: number, saveToLocal: boolean = false) => {
    setScore(score);
    if (saveToLocal && typeof window.localStorage !== undefined) {
      let totalHits =
        parseInt(window.localStorage.getItem(LOCAL_KEY_HITS) || "") || 0;
      const maxSpeed =
        parseInt(window.localStorage.getItem(LOCAL_KEY_RECORD) || "") || 0;
      const record = score > maxSpeed ? score : maxSpeed;
      totalHits += 1;
      localStorage.setItem(LOCAL_KEY_HITS, totalHits.toString());
      localStorage.setItem(LOCAL_KEY_RECORD, record.toString());
    }
  };

  return { score, setScore };
};
