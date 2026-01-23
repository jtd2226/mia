import Head from 'next/head';
import * as styles from '../styles/styles';
import { Link } from '../routes/router';
import { SiteMetaData } from 'metadata';
import Router from '../routes/router';

const links = [
  {
    name: 'About',
    route: 'https://voyagela.com/interview/conversations-with-lovpune',
    target: '_blank',
  },
  {
    name: 'Music',
    route: 'https://distrokid.com/hyperfollow/lovpune/by-design',
    target: '_blank',
  },
  { name: 'Socials', route: 'socials' },
  { name: 'Shop', route: 'shop', disabled: true },
];

export default function Home({ children }) {
  const { page } = Router.use();

  const anyActive = links.some(link => link.route === page);
  return (
    <>
      <Head>
        <title>{SiteMetaData.title}</title>
      </Head>

      <nav style={styles.nav}>
        <Link route="home">
          <img src="/img/LOVPUNE_LOGO.png" style={styles.logo.main} />
        </Link>
        <span style={{ flex: 1 }}></span>
        {links.map(link => (
          <Link
            key={link.name}
            route={link.route}
            style={styles.pageLink}
            target={link.target}
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
