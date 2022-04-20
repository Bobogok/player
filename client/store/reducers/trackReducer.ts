import { TrackAction, TrackActionTypes, TrackState } from '../../types/track';

const initialState: TrackState = {
  tracks: [],
  error: '',
};

export const trackReducer = (
  state = initialState,
  action: TrackAction,
): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return { tracks: action.payload, error: '' };
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TrackActionTypes.DELETE:
      return {
        ...state,
        tracks: state.tracks.filter((track) => track._id !== action.payload),
      };
    default:
      return state;
  }
};
