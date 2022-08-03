import { EmbeddedAlbum, Iframe } from '../iframe/iframe';

export default function Home() {
  return (
    <>
      <EmbeddedAlbum
        url="https://open.spotify.com/embed/album/5uJ4OU7mD7pZPBCO8vPbKA"
        height="160px"
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
      <EmbeddedAlbum url="https://open.spotify.com/embed/album/6dYcouiQ3ywpXgNfwmLdlR" />
      {/* <EmbeddedAlbum url="https://embed.music.apple.com/us/album/imminent-euphoria-ep/1535333016" /> */}
      <EmbeddedAlbum url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/991434859&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
      <EmbeddedAlbum url="https://bandcamp.com/EmbeddedPlayer/album=3920738786/size=large/bgcol=ffffff/linkcol=f171a2/artwork=small/transparent=true/">
        <a href="http://miamaddenmusic.bandcamp.com/album/imminent-euphoria">
          Imminent Euphoria by MIA
        </a>
      </EmbeddedAlbum>
    </>
  );
}
