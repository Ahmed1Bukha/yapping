import { AppProps } from "next/app";
import bayanplus from "bayanplus-js";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("test");
    bayanplus.init({
      projectId: process.env.BAYAN_API_KEY!,
      isDev: false,
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
