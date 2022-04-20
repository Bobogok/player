import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const res = await axios.get('http://localhost:5000/tracks');
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: res.data });
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
