import Router from '../routes/router';

const paths = Object.keys(Router.routes).map(route => ({
  params: { slug: route },
}));

export function getStaticProps(ctx) {
  if (ctx?.params?.slug === 'about') {
    return {
      redirect: {
        destination:
          'https://voyagela.com/interview/conversations-with-lovpune',
        permanent: false,
      },
    };
  }
  if (ctx?.params?.slug === 'music') {
    return {
      redirect: {
        destination: 'https://distrokid.com/hyperfollow/lovpune/by-design',
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
