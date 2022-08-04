import dynamic from 'next/dynamic';
import Router from '../routes/router';

const Backgrounds = {
  defaultImage: '/img/MAMA/background.jpeg',
  main: {
    component: dynamic(() => import('../GL/scene')),
  },
};

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
  const routeInfo = Router.routes[slug];
  const background = routeInfo.background || Backgrounds.main;
  const Background = background.component || Backgrounds.main.component;
  return (
    <Background
      images={background.images || background.image || Backgrounds.defaultImage}
    >
      <Router {...props} />
    </Background>
  );
}
