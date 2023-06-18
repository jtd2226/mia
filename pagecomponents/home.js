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
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          textAlign: 'center',
          position: 'relative',
          gap: '12px',
        }}
      >
        <World
          images="/img/MAMA/albumlast_time.jpg"
          amplitude={2}
          glitch
          style={{ width: '250px', height: '250px', marginRight: '40px' }}
        />
        <img src="/text/albumtext.png" style={{ width: '350px' }} />
      </a>
    </Container>
  );
}
