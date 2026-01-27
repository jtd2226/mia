import Router from '../routes/router';
import { NavLinks } from 'metadata';

const paths = Object.keys(Router.routes).map(route => ({
  params: { slug: route },
}));

export function getStaticProps(ctx) {
  const redirect = NavLinks[ctx?.params?.slug]?.redirect;
  if (redirect) {
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    };
  }
  return {
    props: {},
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: true,
  };
}

export default function SlugPage(props) {
  const {
    router: {
      query: { slug },
    },
  } = props;
  if (!slug) return null;

  return <Router {...props} />;
}
