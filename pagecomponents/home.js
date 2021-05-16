import { Link } from '../routes/router';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 20vh;
`;

export default function Home() {
  return (
    <Container>
      <Link route="presave">
        <a>Click to Pre-Save</a>
      </Link>
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
