import ChartHeader from '../components/ChartHeader';
import TrackList from '../components/TrackList';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MainLayout from '../layout/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchTracks } from '../store/actions-creators/track';

const Index = () => {
  const { tracks, error } = useTypedSelector((state) => state.track);

  return (
    <MainLayout>
      <ChartHeader tracks={tracks} />
      <TrackList tracks={tracks} />
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  // @ts-ignore
  async ({ req, res, ...etc }) => {
    const state = store.getState();

    if (state.track.tracks.length === 0) {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(await fetchTracks());
    }
  },
);
