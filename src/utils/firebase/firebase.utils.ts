// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  signOut,
  onAuthStateChanged,
 } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { ProductCategories } from "../../types/DBTypes";

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


// upload shop data to firestore db collection
export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: ProductCategories[]
) => {
  const batch = writeBatch(db); // batch istance to add data objects to collection by transaction
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    // get document reference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // create and attach object to collection as new docs,
    // where the key is the title and the value is gthe object
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// userAuth is sth signInWithGooglePopup return for example
export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {}) => {
  if (!userAuth) return;

  // is there existing reference?. db: firebase db ref, users: collection, userAuth.uid: identifier: authentication user data uid
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error: FirebaseError | Error | unknown) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;

}; // user authentication object, store to firestore
// google create userdocref although there is no collection there, so that the ref point to some unique point in db, so that it can use it to store data. getDoc to get the document related data


// for email and password auth
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};


// sign out user
export const signUserOut = async () => signOut(auth);

// return unsubscribe
export const onAuthStateChangedListener = (callback) => {
  // callback when the auth state change
  onAuthStateChanged(auth, callback);
};



// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
