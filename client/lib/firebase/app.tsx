import React from 'react';
import firebase from 'firebase/app';

const config = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_APP_ID,
};

const FirebaseContext = React.createContext<firebase.app.App | undefined>(undefined);

const DEFAULT_NAME = '[DEFAULT]';

interface ProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider = ({ children }: ProviderProps) => {
  const app = React.useMemo(() => {
    const existingApp = firebase.apps.find((a) => a.name === DEFAULT_NAME);

    if (existingApp) {
      return existingApp;
    }

    return firebase.initializeApp(config);
  }, []);

  return (
    <FirebaseContext.Provider value={app}>
      { children }
    </FirebaseContext.Provider>
  );
};

export const useFirebaseApp = () => {
  const context = React.useContext(FirebaseContext);

  if (!context) {
    throw Error(
      'useFirebaseApp must be used within a FirebaseProvider'
    );
  }

  return context;
};