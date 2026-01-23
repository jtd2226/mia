import World from 'GL/scene';
import * as styles from '../styles/styles';

const videos = [
  'https://www.youtube.com/embed/JIIGuDBs_6A?si=dR5f8Afew2gPPt5d',
  'https://www.youtube.com/embed/FgpuwyFwfRg?si=sAeBbGHxGJkFdLXu',
  'https://www.youtube.com/embed/RO2YCjhlcyk?si=c-V0EdiB_8nmkSoN',
];

function Gap() {
  return <div style={{ height: '32px', width: '100%' }} />;
}

export default function Home() {
  return (
    <>
      <main>
        <World
          amplitude={-1}
          images="/img/still_portrait.jpg"
          style={{ width: '100%' }}
        />
        <span style={styles.form.mailingList.section}>
          <World
            amplitude={2}
            images="/img/EtherealOrb.png"
            style={{ width: 'min(100%, 700px)' }}
          >
            <span style={styles.form.mailingList.container}>
              <span style={styles.form.mailingList.inputContainer}>
                <input
                  type="text"
                  placeholder="EMAIL ADDRESS"
                  style={styles.form.mailingList.input}
                ></input>
                <button style={styles.form.mailingList.button}>JOIN</button>
              </span>
              <p style={styles.form.mailingList.notice}>
                By connecting you agree to receive updates from Lovepune via
                email
              </p>
            </span>
          </World>
        </span>
        <div style={styles.videos}>
          {videos.map(src => (
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
        <World
          amplitude={-2}
          images="/img/transparent_portrait.png"
          style={{
            width: 'min(75%, 800px)',
          }}
        />
      </footer>
    </>
  );
}
