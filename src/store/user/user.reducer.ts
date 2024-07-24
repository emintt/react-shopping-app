import { User } from 'firebase/auth';
import { USER_ACTION_TYPES } from './user.types';

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


const userReducer = (state = initialState, action: UserAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };
    default:
      return state;
  }

};

export { userReducer };
