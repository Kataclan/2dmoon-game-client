import styles from "./TwitterButton.module.css";
import { FC, useEffect, useMemo, useState } from "react";
import { LOCAL_KEY_RECORD } from "config/local";

const TweetButtonComponent: FC<{ href: string }> = ({ href }) => {
  return (
    <a href={href} className={styles.twitter_button}>
      Tweet your record!
    </a>
  );
};

const TweetButton: FC = () => {
  const [record, setRecord] = useState(0);

  const twitterHref = useMemo(() => {
    const message = `I%20hit%20the%20moon%20at%20${record}km/h%21`;
    return `https://twitter.com/intent/tweet?url=https%3A%2F%2dmoon.hypernifty.com&text=${message}&hashtags=hypernifty,2dmoon,nft`;
  }, [record]);

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      setRecord(
        parseInt(window.localStorage.getItem(LOCAL_KEY_RECORD) || "") || 0
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <TweetButtonComponent href={twitterHref} />
    </div>
  );
};

export default TweetButton;
