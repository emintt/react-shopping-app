// where states live, where receive and dispatch actions to redux
import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { RootReducer, rootReducer } from './root-reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loggerMiddleware from '../middleware/logger';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancer =
  (process.env.NODE_ENV !== 'production') &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  ||
  compose;

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user'], // user reducer is not persisted
};

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);


// actions hit mdware before hit the reducers
// const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
//   Boolean
// );

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  loggerMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));


// middlewares is sth like enhancer
// compose: can pass multiple functions left to right
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root-reducer to generate store
// undefined: additional default states
const store = createStore(persistedReducer, undefined, composedEnhancers);
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export { store, persistor };
