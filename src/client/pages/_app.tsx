// import type { AppProps } from "next/app";
import StorageProvider from "../providers/StorageProvider";
import "../styles/globals.css";
import { NextPageWithLayout } from "./page";

// interface AppPropsWithLayout extends AppProps {
//   Component: NextPageWithLayout;
// }

const MyApp: any = ({
  Component,
  pageProps,
}: {
  Component: NextPageWithLayout;
  pageProps: any;
}) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: any) => page);
  return (
    <StorageProvider>{getLayout(<Component {...pageProps} />)}</StorageProvider>
  );
};

export default MyApp;
