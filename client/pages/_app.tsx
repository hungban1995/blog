import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";

import stores from "../stores";
import NotifiCation from "@/components/Notification";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={stores}>
      <NotifiCation />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
