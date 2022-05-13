import axios from 'axios';
import { Dispatch } from 'react';
import { ITrack, TrackAction, TrackActionTypes } from '../../types/track';

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const res = await axios.get<ITrack[]>('http://localhost:5000/tracks');
      const sortData = res.data.sort((a, b) => {
        if (a.listens < b.listens) {
          return 1;
        }
        if (a.listens > b.listens) {
          return -1;
        }
        return 0;
      });
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: sortData });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Ошибка при загрузке треков',
      });
    }
  };
};

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const res = await axios.get(
        'http://localhost:5000/tracks/search?query=' + query,
      );
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: res.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Ошибка при загрузке треков',
      });
    }
  };
};

export const deleteTrack = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const res = await axios.delete('http://localhost:5000/tracks/' + id);
      dispatch({ type: TrackActionTypes.DELETE, payload: res.data });
    } catch (e) {
      alert(
        'Что то пошло не так при удалении трека (подробности в консоли разработчика)',
      );
      console.error(e);
    }
  };
};

export const addListen = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      await axios.post('http://localhost:5000/tracks/listen/' + id);
      dispatch({ type: TrackActionTypes.ADD_LISTEN, payload: id });
    } catch (e) {
      console.error(e);
    }
  };
};
