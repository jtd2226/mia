import { EmbeddedAlbum, Iframe } from '../iframe/iframe';

export default function Home() {
  return (
    <>
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/album/5uJ4OU7mD7pZPBCO8vPbKA"
        height="152px"
      />
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/track/5c3PclxMVh8UjoyrmDplII"
        compact
      />
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/track/6QFT2wp78XP1JfFTupFSiS"
        compact
      />
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/track/3EXxdgx5zDyEUswBOuDVrK"
        compact
      />
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/track/27RMWQRyOzOuqFiNFA6UnY"
        compact
      />
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/track/31FTac3rJ5fYidpA8axd2r"
        compact
      />
    </>
  );
}
