import "./globals.css";
import type { AppProps } from "next/app";
import LoadingIndicator from "@/components/loadingIndicator";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoadingIndicator />
      <Component {...pageProps} />
    </>
  );
}
