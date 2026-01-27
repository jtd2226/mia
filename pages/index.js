import Head from 'next/head';
import * as styles from '../styles/styles';
import { Link } from '../routes/router';
import { SiteMetaData, NavLinks } from 'metadata';
import Router from '../routes/router';

export default function Home({ children }) {
  const { page } = Router.use();
  const links = Object.entries(NavLinks);
  const anyActive = links.some(([route]) => route === page);
  return (
    <>
      <Head>
        <title>{SiteMetaData.title}</title>
      </Head>

      <nav style={styles.nav} className="top-nav">
        <Link route="home" className="home-link">
          <img src="/img/LOVPUNE_LOGO.png" style={styles.logo.main} />
        </Link>
        <span className="spacer" />
        {links.map(([route, link]) => (
          <Link
            key={link.name}
            route={link.redirect ?? route}
            style={styles.pageLink}
            target={link.external ? '_blank' : '_self'}
            className={
              page === link.route ? 'active' : anyActive ? 'inactive' : 'idle'
            }
            disabled={link.disabled || false}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}
