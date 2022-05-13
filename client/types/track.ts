export interface IComments {
  _id: string;
  username: string;
  text: string;
}

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComments[];
}

export interface TrackState {
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
  DELETE = 'DELETE',
  ADD_LISTEN = 'ADD_LISTEN',
}

interface FetchTrackAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface FetchTrackErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

interface DeleteTrackAction {
  type: TrackActionTypes.DELETE;
  payload: string;
}

interface AddListenTrackAction {
  type: TrackActionTypes.ADD_LISTEN;
  payload: string;
}

export type TrackAction =
  | FetchTrackAction
  | FetchTrackErrorAction
  | DeleteTrackAction
  | AddListenTrackAction;
