import '../styles/globals.css';
import '../styles/animations.css';
import { StrictMode } from 'react';
import Head from 'next/head';
import Error from '../error/index';

function MyApp({ Component, router, pageProps }) {
  return (
    <StrictMode>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Error>
        <div className="bg" />
        <Component {...{ ...pageProps, router }} />
      </Error>
    </StrictMode>
  );
}

export default MyApp;
