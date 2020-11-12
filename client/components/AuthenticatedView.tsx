import React, { useState } from 'react';
import firebase from 'firebase';
import { useFirebaseApp } from '../lib/firebase/app';
import { signOut } from '../lib/firebase/auth';
import { getUser, UserProfile } from '../lib/firebase/functions';
import styles from '../../styles/Home.module.css';

interface Props {
  user: firebase.User;
}

interface State {
  profile: UserProfile | null;
  loading: boolean;
}

function AuthenticatedView({ user }: Props) {
  const app = useFirebaseApp();
  const [{ profile, loading }, setProfile] = useState<State>({
    profile: null,
    loading: true,
  });

  React.useEffect(() => {
    getUser({ app }).then((userProfile) => {
      setProfile({
        profile: userProfile,
        loading: false,
      });
    });
  }, []);

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

      {
        loading ? 'Loading profile...' : <pre>{ JSON.stringify(profile, null, 1) }</pre>
      }

      <button onClick={() => signOut(app)}>Sign Out</button>
    </main>
  );
}

export default AuthenticatedView;