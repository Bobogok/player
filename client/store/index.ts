import { reducer, RootState } from './reducers';
import { applyMiddleware, compose, createStore, Store, AnyAction } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk, { ThunkDispatch } from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const makeStore = (context: any) => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
