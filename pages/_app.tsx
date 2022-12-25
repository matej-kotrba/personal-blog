import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--font-roboto",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${roboto.variable} ${roboto.className}`}>
        <Navbar />
        <main className="container grid grid-cols-6 gap-2 p-6 mx-auto rounded-lg mt-[100px]">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
