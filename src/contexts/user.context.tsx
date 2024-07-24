import React, { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { USER_ACTION_TYPES } from "../store/user/user.types";

type UserContextType = {
  currentUser: User | null | undefined;
};

// the actual value we want to access
export const UserContext = createContext<UserContextType>({
  // setCurrentUser: (user: User) => null,
  currentUser: null,
});

type UserAction = {
  type: string;
  payload?: User;
};

type UserState = {
  currentUser: User | null | undefined;
};


const initialState: UserState = {
  currentUser: null,
}


const userReducer = (state: typeof initialState, action: UserAction): UserState => {
  const { type, payload } = action;
  console.log(state);
  console.log(action);
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }

};



// actual component
export const UserProvider = ({children} : {children: React.ReactNode}) => {
  const [state, dispatch]= useReducer(userReducer, initialState);

  const { currentUser } = state;





  const value = {
    currentUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

/*
const reducer = (state, action) => {
  return {
    currenUser
  }
}

 */
