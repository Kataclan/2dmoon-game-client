import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Score from "components/score";

const GameSketch = dynamic(() => import("../components/game-sketch"), {
  ssr: false,
});

export default function Home() {
  const [score, setScore] = useState(0);

  const handleGameFirstPress = () => {
    console.log("First game press");
  };
  const handleGameFinish = (score: number) => {
    setScore(score);
  };
  const handleResetGame = () => {
    setScore(0);
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
      <footer className={styles.home__footer}></footer>
    </div>
  );
}
