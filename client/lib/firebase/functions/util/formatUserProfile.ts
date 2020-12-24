import firebase from 'firebase/app';

export interface UserProfile {
  id: Fallback<string>;
  email: Fallback<string>;
  name: Fallback<string>;
  location: {
    _latitude: Fallback<number>;
    _longitude: Fallback<number>;
  };
  subscribed: Fallback<boolean>;
}

export default function formatUserProfile(callableResult: firebase.functions.HttpsCallableResult): UserProfile {
  const { data } = callableResult;

  return {
    id: data._ref._path?.segments[1],
    email: data?._fieldsProto?.email.stringValue,
    name: data?._fieldsProto?.name.stringValue,
    subscribed: data?._fieldsProto?.subscribed.booleanValue,
    location: {
      _latitude: data?._fieldsProto?.location.geoPointValue.latitude,
      _longitude: data?._fieldsProto?.location.geoPointValue.longitude,
    }
  };
}