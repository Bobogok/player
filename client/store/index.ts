import { reducer, RootState } from './reducers';
import { createStore, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';

const makeStore = (context: Context) => createStore(reducer);

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
