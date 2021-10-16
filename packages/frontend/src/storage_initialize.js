import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyAeo_FvuNOhPHhfraP0Or8QFnlBwGFVMao',
  authDomain: 'social-media.appspot.com',
  databaseURL: 'social-media.appspot.com',
  storageBucket: 'gs://social-mediaaa.appspot.com',
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
export { storage };
