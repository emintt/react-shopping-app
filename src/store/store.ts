// where states live, where receive and dispatch actions to redux
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducers';

// mdware: create reusable middleware funtions: chained function

// func returns another func, which receive the next method
const loggerMiddleware = (store) => (next) => (action) => {
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


// actions hit mdware before hit the reducers
const middleWares = [loggerMiddleware];

// middlewares is sth like enhancer
// compose: can pass multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer to generate store
// undefined: additional default states
const store = createStore(rootReducer, undefined, composedEnhancers);

export type RootState = ReturnType<typeof store.getState>

export { store };
