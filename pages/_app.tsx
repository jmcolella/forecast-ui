import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'; // eslint-disable-line import/no-unassigned-import
import { FirebaseProvider } from '../client/lib/firebase/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
