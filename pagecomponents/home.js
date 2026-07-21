import * as styles from '../styles/styles';
import Image from 'next/image';
import { YouTubeVideos } from 'metadata';
import { SignupPage } from 'pagecomponents/rsvp';

function Gap() {
  return <div style={{ height: '32px', width: '100%' }} />;
}

export default function Home() {
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
        <SignupPage />
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
      </footer>
    </>
  );
}
