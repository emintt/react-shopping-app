import { User } from "firebase/auth";
import { USER_ACTION_TYPES } from "./user.types";

const setCurrentUser = (user: User) => {
  // create action to reducer, includes type and payload
  return ({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
};

export { setCurrentUser };
