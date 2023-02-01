import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";

import StorageProvider from "providers/StorageProvider";
import "./globals.css";

interface Props extends AppProps {
  Component: NextPageWithLayout;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: any) => page);
  return (
    <StorageProvider>{getLayout(<Component {...pageProps} />)}</StorageProvider>
  );
};

export default MyApp;
