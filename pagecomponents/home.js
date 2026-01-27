import World from 'GL/scene';
import * as styles from '../styles/styles';
import Image from 'next/image';
import { YouTubeVideos } from 'metadata';

function Gap() {
  return <div style={{ height: '32px', width: '100%' }} />;
}

export default function Home() {
  const laylo = new URLSearchParams({
    dropId: '43RCw',
    theme: 'dark',
    background: 'transparent',
  }).toString();
  return (
    <>
      <main>
        <Image
          src="/img/still_portrait.jpg"
          alt="Background Image of Lovpune"
          width={3200}
          height={1800}
          fill="true"
          priority
        />
        {/* <World
          amplitude={-1}
          images="/img/still_portrait.jpg"
          style={{ width: '100%' }}
        /> */}
        <span
          style={styles.form.mailingList.section}
          className="mailing-list-container"
        >
          <World
            amplitude={2}
            images="/img/EtherealOrb.png"
            style={styles.form.mailingList.canvas}
          />
          <iframe
            id="laylo-drop-43RCw"
            allow="web-share"
            allowtransparency="true"
            src={`https://embed.laylo.com?${laylo}`}
            style={styles.form.mailingList.iframe}
            className="laylo-embed"
          />
        </span>
        <div style={styles.videos}>
          {YouTubeVideos.map(src => (
            <iframe
              key={src}
              src={src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ flex: '1 0 auto', height: '250px' }}
            />
          ))}
        </div>
      </main>
      <Gap />
      <footer
        style={{
          flex: '1',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          <Image
            src="/img/transparent_portrait.png"
            alt="Background Image of Lovpune"
            width={3200}
            height={1800}
            priority
          />
        </div>
        {/* <World
          amplitude={-2}
          images="/img/transparent_portrait.png"
          style={{
            width: 'min(75%, 800px)',
          }}
        /> */}
      </footer>
    </>
  );
}
