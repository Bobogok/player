import { rootReducer, RootState } from './reducers';
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

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

const initStore = () => {
  return store;
};

export const wrapper = createWrapper<Store<RootState>>(initStore, {
  debug: true,
});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
