import World from 'GL/scene';
// import { Link } from '../routes/router';

const Container = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export default function Home() {
  return (
    <Container>
      {/* <Link route="presave">
        <a>Click to Pre-Save</a>
      </Link> */}
      <a
        href="https://open.spotify.com/album/5iqD2ZXFfZG8XLZpiEqyon"
        target="_blank"
        rel="noreferrer"
        className="album-link"
      >
        <span className="album">
          <World
            images="/img/MAMA/albumlast_time.jpg"
            amplitude={-5}
            glitch
            style={{ width: '275px', height: '275px' }}
          />
          <img src="/text/albumtext.png" style={{ width: '350px' }} />
        </span>
      </a>
    </Container>
  );
}
