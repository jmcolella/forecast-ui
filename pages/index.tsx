import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'; // eslint-disable-line import/no-unassigned-import
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useFirebaseApp } from '../client/lib/firebase/app';
import { onAuthStateChanged, AuthState, signIn } from '../client/lib/firebase/auth';
import AuthenticatedView from '../client/components/AuthenticatedView';

export default function Home() {
  const app = useFirebaseApp();
  const provider = new firebase.auth.GoogleAuthProvider();

  const [{ user, loading }, setAuthState] = React.useState<AuthState>({
    user: null,
    loading: true,
  });

  React.useEffect(() => {
    onAuthStateChanged({ app, updater: setAuthState });
  }, []);

  if (loading) {
    return 'Loading';
  }

  if (user) {
    return <AuthenticatedView user={user} />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Forecast!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Forecast
        </h1>

        <p className={styles.description}>
          by John Colella
        </p>

        <button onClick={() => signIn({ app, provider })}>Login</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
