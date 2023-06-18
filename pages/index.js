import Head from 'next/head';
import * as styles from '../styles/styles';
import SocialMedia from '../pagecomponents/social';
import Router, { Link } from '../routes/router';
import PageTransition from '../routes/transition';
import { HomePageData, SiteMetaData } from 'metadata';
import World from 'GL/scene';
import { useEffect, useRef } from 'react';

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

// const titleAnimation = {
//   y: -300,
//   speed: 0.02,
//   get transform() {
//     const y = titleAnimation.y;
//     if (!y) return '';
//     return `translateY(${y}px)`;
//   },
// };

export default function Home({ children }) {
  // const title = useRef();

  // function animateTitle(elapsed) {
  //   const element = title.current;
  //   if (!element) return requestAnimationFrame(animateTitle);
  //   titleAnimation.last ??= elapsed;
  //   const delta = (elapsed - titleAnimation.last) * titleAnimation.speed;
  //   if (!delta) return requestAnimationFrame(animateTitle);

  //   titleAnimation.y = Math.min(titleAnimation.y + delta, 0);
  //   element.style.transform = titleAnimation.transform;

  //   if (!titleAnimation.y) return;

  //   requestAnimationFrame(animateTitle);
  // }

  // useEffect(() => {
  //   if (!title.current) return;
  //   const id = requestAnimationFrame(animateTitle);
  //   return () => {
  //     cancelAnimationFrame(id);
  //   };
  // }, [title]);

  return (
    <main>
      <Head>
        <title>{SiteMetaData.title}</title>
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
      <Link route="home" className="main-title">
        {/* <img
          src="/text/acid_lovpune.png"
          style={{ width: '100%', height: '100%' }}
        /> */}
        <World
          images="/text/acid_lovpune.png"
          amplitude={0}
          rgbshift={2}
          style={{ width: '100%', height: '100%' }}
        />
      </Link>
      {/* <a style={styles.header}>I'll B ur Angel NOW LISTEN ON SPOTIFY</a> */}
      <span className="social-offset">
        <SocialMedia />
      </span>
      <div style={styles.navbar}>
        {/* <Tab route="music" /> */}
        {/* <Tab route="media" /> */}
        {/* <Tab route="about" /> */}
        {/* <PageTransition> */}
        <div className="tab-content">{children}</div>
        {/* </PageTransition> */}
      </div>
    </main>
  );
}
