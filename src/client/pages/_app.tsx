import type { AppProps } from "next/app";
import StorageProvider from "../providers/StorageProvider";
import "./globals.css";
import { NextPageWithLayout } from "./page";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp: AppPropsWithLayout = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <StorageProvider>{getLayout(<Component {...pageProps} />)}</StorageProvider>
  );
};

export default MyApp;
