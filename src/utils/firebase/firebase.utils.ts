// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvWqIMTzcQmqK-hH0ZpCQEwTkXthOBAQo",
  authDomain: "shopping-db-5085c.firebaseapp.com",
  projectId: "shopping-db-5085c",
  storageBucket: "shopping-db-5085c.appspot.com",
  messagingSenderId: "369896220187",
  appId: "1:369896220187:web:229e46af34762678d5babe"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Use Google auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompy: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
