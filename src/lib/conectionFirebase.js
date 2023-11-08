// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkOFVWlEeh_u6vLmVqgEho23gVXaQLcX8',
  authDomain: 'catgram-fdb6c.firebaseapp.com',
  projectId: 'catgram-fdb6c',
  storageBucket: 'catgram-fdb6c.appspot.com',
  messagingSenderId: '148293569815',
  appId: '1:148293569815:web:8d9659b8a4bf0a714d7b52',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
