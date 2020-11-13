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
  id: string;
  email: string;
  name: string;
  location: {
    _latitude: number;
    _longitude: number;
  };
  subscribed: boolean;
}

export const getUser = async ({ app }: GetUserParams): Promise<UserProfile | null> => {
  const callableGetUser = app?.functions().httpsCallable('getUser');

  if (!callableGetUser) {
    return null;
  }

  const user = await callableGetUser();

  return user.data;
};

interface UpdateUserParams {
  app: firebase.app.App | null;
  data: {
    id: string;
    subscribed?: boolean;
  };
}
export const updateUser = async ({ app, data }: UpdateUserParams): Promise<UserProfile | null> => {
  const callableUpdateUser = app?.functions().httpsCallable('updateUser');

  if (!callableUpdateUser) {
    return null;
  }

  console.log('Data', data);

  const user = await callableUpdateUser(data);

  return user.data;
};