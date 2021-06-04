import { Link } from '../routes/router';

const Container = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifycontent: 'center',
      textAlign: 'center',
      marginTop: '15vh',
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
        href="mailto:miamaddenmgmt@gmail.com"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
      >
        <img
          src="/img/contact-button.png"
          style={{ width: '200px', borderRadius: '8px' }}
        />
      </a>
    </Container>
  );
}
