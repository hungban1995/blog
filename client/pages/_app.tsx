import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";

import stores from "../stores";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={stores}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
