import Head from 'next/head';
import * as styles from '../styles/styles';
import SocialMedia from '../pagecomponents/social';
import Router, { Link } from '../routes/router';
import PageTransition from '../routes/transition';
import { HomePageData } from 'metadata';

function Tab({ route }) {
  const { page } = Router.use();
  return (
    <Link
      route={route}
      style={{
        ...styles.pageLink,
        ...(route === page ? styles.pageLink.selected : {}),
      }}
    >
      {route.toUpperCase()}
    </Link>
  );
}

export default function Home({ children }) {
  return (
    <main>
      <Head>
        <title>M I A | Forever Is a Long Time Out Now!</title>
      </Head>
      {/* <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100vh',
          width: '100vw',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <svg
          style={{ width: 'min(100vw, 100vh)', height: '100vh' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMaxYMax slice"
        >
          <image href="/img/MAMA/mamacowboy.png" height="100" width="100" />
          <image href="/img/MAMA/angelmama.jpg" height="100" width="100" />
        </svg>
      </div> */}
      <Link route="home">
        <h1 style={styles.MIA}>{HomePageData.title}</h1>
      </Link>
      {/* <a style={styles.header}>I'll B ur Angel NOW LISTEN ON SPOTIFY</a> */}
      <SocialMedia />
      <div style={styles.navbar}>
        <Tab route="music" />
        <Tab route="media" />
        <Tab route="about" />
        <PageTransition>
          <div style={styles.tabContent}>{children}</div>
        </PageTransition>
      </div>
    </main>
  );
}
