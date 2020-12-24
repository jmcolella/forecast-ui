import firebase from 'firebase/app';
import 'firebase/functions'; // eslint-disable-line import/no-unassigned-import

import formatUserProfile, { UserProfile } from './util/formatUserProfile';

interface GetUserParams {
  app: firebase.app.App | null;
}

export const getUser = async ({ app }: GetUserParams): Promise<UserProfile | null> => {
  const callableGetUser = app?.functions().httpsCallable('getUser');

  if (!callableGetUser) {
    return null;
  }

  const user = await callableGetUser();

  return formatUserProfile(user);
};

interface UpdateUserParams {
  app: firebase.app.App | null;
  data: {
    id: Fallback<string>;
    subscribed?: boolean;
  };
}
export const updateUser = ({ app, data }: UpdateUserParams): Promise<UserProfile | null> => {
  const callableUpdateUser = app?.functions().httpsCallable('updateUser');

  if (!callableUpdateUser) {
    return Promise.reject('No callable updateUser function');
  }

  return callableUpdateUser(data)
    .then(() => getUser({ app }))
    .catch((error) => Promise.reject(error));
};