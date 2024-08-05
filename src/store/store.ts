// where states live, where receive and dispatch actions to redux
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { RootReducer, rootReducer } from './root-reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

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

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user'], // user reducer is not persisted
};

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);


// actions hit mdware before hit the reducers
const middleWares = [loggerMiddleware];

// middlewares is sth like enhancer
// compose: can pass multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer to generate store
// undefined: additional default states
const store = createStore(persistedReducer, undefined, composedEnhancers);
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export { store, persistor };
