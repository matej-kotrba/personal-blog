import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${roboto.variable} ${roboto.className}`}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
