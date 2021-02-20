import { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import GlobalStyle from '@/styles/GlobalStyle';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
