// mdware: create reusable middleware funtions: chained function

import { Dispatch, MiddlewareAPI, UnknownAction } from "redux";

// func returns another func, which receive the next method
const loggerMiddleware = (store: MiddlewareAPI<Dispatch<UnknownAction>>) => (next: Dispatch<UnknownAction>) => (action: UnknownAction) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());

  // pass actions to all reducers
  next(action);

  console.log('newState', store.getState());
};

export default loggerMiddleware;
