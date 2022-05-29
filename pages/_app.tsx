import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // init analytics
  return <Component {...pageProps} />;
}

export default MyApp;
