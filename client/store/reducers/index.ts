import { trackReducer } from './trackReducer';
import { playerReducer } from './playerReducer';
import { combineReducers, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { PlayerState } from '../../types/player';

const combinedReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
});

// create your reducer
export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    if (action.payload.player.active === null) {
      nextState.player = state.player;
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export type RootState = ReturnType<typeof combinedReducer>;
