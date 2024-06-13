import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

// as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


// actual component
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      console.log(user);
    });
    console.log(unsubscribe);
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
