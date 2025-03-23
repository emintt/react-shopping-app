import { FirebaseError, initializeApp } from 'firebase/app';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
 } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, DocumentData } from 'firebase/firestore';
import { ProductCategories } from "../../types/DBTypes";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROTECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
console.log(firebaseConfig);
// Initialize Firebase
initializeApp(firebaseConfig);

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

export const getCategoriesAndDocuments = async (): Promise<DocumentData[]> => {
  const collectionRef = collection(db, 'categories');

  // generate query from collectionRef, return an object that can get snapshot from
  const q = query(collectionRef);
  // get snapshot of all document snapshots
  const querySnapshot = await getDocs(q);
  // querySnapshot.docs give back an array includes all invidual docs inside
  // return the array to get the final object we want
  // map out all docs to get all these docs
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

/*
The object we want
{
  hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
  },
  jackets: {
    title: 'Jackets',
    items: [
      {},
      {}
    ]
  }
}

*/


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
      if (error instanceof Error) {
        console.log('error creating user', error.message);
      } else {
        console.log('error creating user', error);
      }
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
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
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
