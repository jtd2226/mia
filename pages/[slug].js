import Router from '../routes/router';

const paths = Object.keys(Router.routes).map(route => ({
  params: { slug: route },
}));

export function getStaticProps() {
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
