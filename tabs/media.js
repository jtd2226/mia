import { EmbeddedVideo } from '../iframe/iframe';
import useSWR from 'swr';
import { getLatestVideos } from '../youtube/api';

export default function Home() {
  const { data: urls } = useSWR('media', getLatestVideos);
  return (
    urls?.map(url => <EmbeddedVideo key={url} url={url} />) || <EmbeddedVideo />
  );
}
