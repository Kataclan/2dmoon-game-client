import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const GameSketch = dynamic(() => import("../components/game-sketch"), {
  ssr: false,
});

export default function Home() {
  const handleGameFirstPress = () => {
    console.log("First game press");
  };
  const handleGameFinish = (score: number) => {
    console.log("Game finished! Your score is: ", score);
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
        <GameSketch
          onFirstPress={handleGameFirstPress}
          onFinishGame={handleGameFinish}
        />
      </main>
      <footer className={styles.home__footer}></footer>
    </div>
  );
}
