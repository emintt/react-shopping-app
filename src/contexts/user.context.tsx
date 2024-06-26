import React, { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

// as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


// actual component
export const UserProvider = ({children} : {children: React.ReactNode}) => {
  const [currentUser, setCurrentUser] = useState< User | null>(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
