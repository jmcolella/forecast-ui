import firebase from 'firebase/app';
import 'firebase/functions'; // eslint-disable-line import/no-unassigned-import

export function devSetup() {
  const fnsMode = process.env.NEXT_PUBLIC_FUNCTIONS_MODE;
  const port = process.env.NEXT_PUBLIC_FUNCTIONS_EMULATOR_PORT;

  if (fnsMode !== 'development') {
    return;
  }

  // Add emulator for development mode
  // So I don't run up the bill
  if (port) {
    firebase.functions().useEmulator('localhost', parseInt(port, 10));
  } else {
    throw Error('Must set a port for the Firebase emulator in development mode');
  }
}