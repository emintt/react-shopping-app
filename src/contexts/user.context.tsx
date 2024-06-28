import React, { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

type UserContextType = {
  currentUser: User | null | undefined;
};

// as the actual value you want to access
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

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

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

  const setCurrentUser = (user: User) => {
    // dispatch the action to reducer, includes type and payload
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

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
