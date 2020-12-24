import * as React from 'react';
import { useFirebaseApp } from '../lib/firebase/app';
import { getUser, updateUser } from '../lib/firebase/functions/users';
import { UserProfile } from '../lib/firebase/functions/util/formatUserProfile';

interface State {
  profile: UserProfile | null;
  loading: boolean;
}

function Profile() {
  const app = useFirebaseApp();
  const [{ profile, loading }, setProfile] = React.useState<State>({
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

  const update = () => {
    const currentSubscribed = profile?.subscribed;

    return updateUser({
      data: { id: profile?.id, subscribed: !currentSubscribed },
      app,
    }).then((userProfile) => {
      setProfile({
        profile: userProfile,
        loading: false
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  if (!loading && !profile) {
    return <h1>No Profile found!!</h1>;
  }

  return (
    <div>
      {
        loading ? 'Loading profile...' : <pre>{ JSON.stringify(profile, null, 1) }</pre>
      }

      <button onClick={update}>Update Subscribed</button>
    </div>
  );
}

export default Profile;