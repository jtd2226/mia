import Head from 'next/head';
import * as styles from '../styles/styles';

function SocialMediaIcon({ link, alt, logo, style }) {
  return (
    <a href={link} target="_blank">
      <img alt={alt} width="50px" height="50px" src={logo} style={style}></img>
    </a>
  );
}

function SocialMedia() {
  return (
    <div style={styles.socialContainer}>
      <SocialMediaIcon
        link="https://www.instagram.com/miamaddenmusic/"
        alt="instagram"
        logo="/img/social/IG_Logo.png"
      />
      <SocialMediaIcon
        link="https://open.spotify.com/artist/77k8Ock8xJ8UVCMGR7bVup?nd=1"
        alt="spotify"
        logo="/img/social/Spotify_Icon.png"
      />
      <SocialMediaIcon
        link="https://www.youtube.com/user/aimiama2008/videos"
        alt="youtube"
        logo="/img/social/Youtube_Logo.png"
        style={styles.logo.yt}
      />
      <SocialMediaIcon
        link="https://www.tiktok.com/@miamaddenmusic"
        alt="tiktok"
        logo="/img/social/TikTok_Logo.svg"
      />
      <SocialMediaIcon
        link="https://www.facebook.com/miamaddenmusic/"
        alt="facebook"
        logo="/img/social/FB_Logo.png"
        style={styles.logo.fb}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Head>
        <title>M I A | New Single out now!</title>
      </Head>
      <h1 style={styles.MIA}>M I A</h1>
      <SocialMedia />
    </main>
  );
}
