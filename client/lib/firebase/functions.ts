import firebase from 'firebase/app';
import 'firebase/functions'; // eslint-disable-line import/no-unassigned-import

export function devSetup() {
  const port = process.env.NEXT_PUBLIC_FUNCTIONS_EMULATOR_PORT;

  // Add emulator for development mode
  // So I don't run up the bill
  if (port) {
    firebase.functions().useEmulator('localhost', parseInt(port, 10));
  } else {
    throw Error('Must set a port for the Firebase emulator in development mode');
  }
}

interface GetUserParams {
  app: firebase.app.App | null;
}

export interface UserProfile {
  email: string;
  name: string;
  location: {
    _latitude: number;
    _longitude: number;
  };
}

export const getUser = async ({ app }: GetUserParams): Promise<UserProfile | null> => {
  const callableGetUser = app?.functions().httpsCallable('getUser');

  if (!callableGetUser) {
    return null;
  }

  const user = await callableGetUser();

  return user.data;
};