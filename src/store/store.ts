// where states live, where receive and dispatch actions to redux
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducers';

// actions hit mdware before hit the reducers
const middleWares = [logger];

// middlewares is sth like enhancer
// compose: can pass multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer to generate store
// undefined: additional default states
const store = createStore(rootReducer, undefined, composedEnhancers);

export type RootState = ReturnType<typeof store.getState>

export { store };
