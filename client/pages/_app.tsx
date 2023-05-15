import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";

import stores from "../stores";
import NotifiCation from "@/components/Notification";
import { UpdateData } from "@/components/UpdateData";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={stores}>
      <NotifiCation />
      <UpdateData />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
