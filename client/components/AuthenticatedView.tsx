import React from 'react';
import firebase from 'firebase';
import Profile from './Profile';
import { useFirebaseApp } from '../lib/firebase/app';
import { signOut } from '../lib/firebase/auth';
import styles from '../../styles/Home.module.css';

interface Props {
  user: firebase.User;
}

function AuthenticatedView({ user }: Props) {
  const app = useFirebaseApp();

  const {
    displayName,
    photoURL,
  } = user;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        { displayName }
      </h1>

      {
        photoURL &&
          <img src={photoURL} alt="user" />
      }

      <Profile />

      <button onClick={() => signOut(app)}>Sign Out</button>
    </main>
  );
}

export default AuthenticatedView;