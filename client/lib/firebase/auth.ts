import firebase from 'firebase/app';

export interface AuthState {
  user: firebase.User | null;
  loading: boolean;
}
interface AuthStateParams {
  app: firebase.app.App;
  updater: (params: AuthState) => void;
}

export function onAuthStateChanged({ app, updater }: AuthStateParams): void {
  app.auth().onAuthStateChanged((user) => {
    if (user) {
      updater({
        user,
        loading: false,
      });
    } else {
      updater({
        user: null,
        loading: false,
      });
    }
  });
}

interface SignInParams {
  app: firebase.app.App;
  provider: firebase.auth.AuthProvider;
}

export const signIn = ({ app, provider }: SignInParams) => (
  app.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('result', result);
    })
    .catch((err) => {
      console.log('error', err);
    })
);

export const signOut = (app: firebase.app.App) => {
  app.auth().signOut().then(() => {
    console.log('signed out');
  }).catch((error) => {
    console.log('error', error);
  });
};