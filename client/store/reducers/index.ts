import { playerReducer } from './playerReducer';
import { combineReducers, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { PlayerState } from '../../types/player';

const rootReducer = combineReducers({
  player: playerReducer,
});

// create your reducer
export const reducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    default:
      return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
