import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

import Score from "components/score";
import { useState } from "react";
import { LOCAL_KEY_HITS, LOCAL_KEY_RECORD } from "config/local";
import GameSketch from "components/game-sketch";
import Record from "components/record";
import TweetButton from "components/tweet-button";

export default function Home() {
  const saveToLocal = true;
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const handleGameFirstPress = () => {};

  const handleGameFinish = (score: number) => {
    console.log(isGameFinished);
    setScore(score);
    setIsGameFinished(true);
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

  const handleResetGame = () => {
    setScore(0);
    setIsGameFinished(false);
  };

  return (
    <div className={styles.home}>
      <nav className={styles.home__navbar}>
        <img
          className={styles.home__navbar__logo}
          src={"/images/logo-192x110.png"}
          alt="Hypernifty Logo"
        />
      </nav>
      <main className={styles.home__main}>
        <Score score={score} />
        <GameSketch
          onFirstPress={handleGameFirstPress}
          onFinishGame={handleGameFinish}
          onResetGame={handleResetGame}
        />
      </main>
      <footer className={styles.home__footer}>
        <Record />
        <TweetButton />
      </footer>
    </div>
  );
}
