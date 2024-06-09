// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

export const db = getFirestore();

// userAuth is sth signInWithGooglePopup return for example
export const createUserDocumentFromAuth = async (userAuth) => {
  // is there existing reference?. db: firebase db ref, users: collection, userAuth.uid: identifier: authentication user data uid
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  // check if the doc exists
  console.log(userSnapshot.exists());


}; // user authentication object, store to firestore
// google create userdocref although there is no collection there, so that the ref point to some unique point in db, so that it can use it to store data. getDoc to get the document related data
