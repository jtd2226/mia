import * as styles from '../styles/styles';

function SocialMediaIcon({
  link,
  alt,
  logo,
  style,
  width,
  height,
  background,
}) {
  return (
    <a
      href={link}
      target="_blank"
      style={{
        position: 'relative',
        flex: '1 0 100px',
        height: '70px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        alt={alt}
        width={width ?? '50px'}
        height={height ?? '50px'}
        src={logo}
        style={style}
      />
      {background && (
        <div
          style={{
            background,
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '45px',
            height: '45px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            zIndex: -1,
          }}
        />
      )}
    </a>
  );
}

export default function SocialMedia() {
  return (
    <div style={styles.socialContainer}>
      <SocialMediaIcon
        link="https://music.apple.com/us/artist/mia-madden/id1527337487"
        alt="spotify"
        logo="/img/social/Apple_Icon.svg"
        style={{ borderRadius: '50%' }}
      />
      <SocialMediaIcon
        link="https://www.youtube.com/user/aimiama2008/videos"
        alt="youtube"
        logo="/img/social/Youtube_Logo.png"
        style={styles.logo.yt}
      />
      <SocialMediaIcon
        link="https://www.instagram.com/miamaddenmusic/"
        alt="instagram"
        width="54px"
        height="54px"
        logo="/img/social/IG_Logo.png"
      />
      <SocialMediaIcon
        link="https://open.spotify.com/artist/77k8Ock8xJ8UVCMGR7bVup?nd=1"
        alt="spotify"
        logo="/img/social/Spotify_Icon.png"
        background="#191414"
      />
      <SocialMediaIcon
        link="https://www.tiktok.com/@miamaddenmusic"
        alt="tiktok"
        logo="/img/social/TikTok_Logo.svg"
        style={styles.logo.tiktok}
      />
      <SocialMediaIcon
        link="https://miamaddenmusic.bandcamp.com"
        alt="band camp"
        logo="/img/social/Bandcamp_Icon.png"
        width="54px"
        height="54px"
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
