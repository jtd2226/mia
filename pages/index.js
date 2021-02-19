import Head from 'next/head';
import * as styles from '../styles/styles';
import SocialMedia from '../pagecomponents/social';
import Router, { Link } from '../pagecomponents/router';
import PageTransition from '../pagecomponents/transition';

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
        <title>M I A | New Single out now!</title>
      </Head>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100vh',
          width: '100vw',
          textAlign: 'center',
          pointerEvents: 'none',
          animation: styles.animation.slideup,
          zIndex: -1,
        }}
      >
        <svg
          style={{ width: 'min(100vw, 100vh)', height: '100vh' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <image href="/img/MAMA/mamacowboy.png" height="100" width="100" />
        </svg>
      </div>
      <Link route="home">
        <h1 style={styles.MIA}>M I A</h1>
      </Link>
      {/* <a style={styles.header}>1-800-RUNAWAY OUT NOW LISTEN ON SPOTIFY</a> */}
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