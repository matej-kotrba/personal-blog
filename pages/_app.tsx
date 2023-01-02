import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Roboto } from "@next/font/google";
import { Footer } from "../components";
import { QueryClient, QueryClientProvider } from "react-query";
import MainContextWrapper from "../contexts/MainContext";
import Head from "next/head";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--font-roboto",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Sealblog - Blog about web development</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        ></meta>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/imgs/general/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="/imgs/general/logo.png"
          sizes="50x40"
        />
        <link
          rel="apple-touch-icon"
          href="/imgs/general/apple-touch-icon.png"
          sizes="50x40"
        ></link>
      </Head>
      <MainContextWrapper>
        <div
          className={`${roboto.variable} ${roboto.className} relative min-h-screen`}
        >
          <Navbar />
          <main className="container grid grid-cols-6 gap-2 p-1 mx-auto rounded-lg md:p-3 lg:p-6">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </MainContextWrapper>
    </QueryClientProvider>
  );
}

export default MyApp;
