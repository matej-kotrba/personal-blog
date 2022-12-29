import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Roboto } from "@next/font/google";
import { Footer } from "../components";
import { QueryClient, QueryClientProvider } from "react-query";

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
      <div className={`${roboto.variable} ${roboto.className}`}>
        <Navbar />
        <main className="container grid grid-cols-6 gap-2 p-1 md:p-3 lg:p-6 mx-auto rounded-lg mt-[100px]">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
