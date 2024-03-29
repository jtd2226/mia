import { useState, createContext, useContext, useEffect } from 'react';
import usePrevious from '../hooks/usePrevious';
import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../pages/index'));

const routes = {
  home: {
    component: dynamic(() => import('../pagecomponents/home')),
  },
  music: {
    component: dynamic(() => import('../tabs/music')),
  },
  media: {
    component: dynamic(() => import('../tabs/media')),
  },
  about: {
    component: dynamic(() => import('../tabs/about')),
  },
  // presave: {
  //   component: dynamic(() => import('../pagecomponents/presave')),
  // },
};

const wrapped = arr =>
  new Proxy(
    arr.reduce(
      (indexMap, item, index) => ({
        ...indexMap,
        [`${item}`]: index,
      }),
      {}
    ),
    {
      get(target, key) {
        if (key < 0) return arr[arr.length + Number(key)];
        else if (key >= arr.length) return arr[0];
        else return arr[key] ?? target[key];
      },
    }
  );

const RouterContext = createContext({});

const keys = wrapped(Object.keys(routes));

const Router = props => {
  const {
    router: {
      query: { slug },
    },
  } = props;
  const [page, setPage] = useState(slug);
  const prev = usePrevious(page);
  const routeInfo = routes[page];
  const Component = routeInfo.component ?? routes.home.component;
  useEffect(() => {
    window.onpopstate = () => setPage(location.href.split('/').pop());
    return () => {
      window.onpopstate = null;
    };
  }, []);
  return (
    <RouterContext.Provider
      value={{
        page,
        prev,
        go: direction => {
          history.go(direction);
          const next = keys[keys[page] + direction];
          setPage(next);
        },
        push: route => {
          history.pushState(null, '', `/${route}`);
          setPage(route);
        },
      }}
    >
      <Home page={page}>
        <Component {...props} page={page} />
      </Home>
    </RouterContext.Provider>
  );
};
Router.use = () => useContext(RouterContext);
Router.routes = routes;
Router.keys = keys;

export function Link(props) {
  const { push } = Router.use();
  const { route, background, children, ...rest } = props;
  const external = background || route.startsWith('http');
  const target = background ? '_blank' : undefined;
  const rel = background ? 'noreferrer' : undefined;
  return (
    <a
      href={route}
      onClick={e => {
        if (external) return;
        if (e.metaKey) return;
        e.preventDefault();
        push(route);
      }}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Router;
