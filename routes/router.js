import { useState, createContext, useContext, useEffect } from 'react';
import usePrevious from '../hooks/usePrevious';
import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../pages/index'));

const routes = {
  home: {
    component: dynamic(() => import('../pagecomponents/home')),
  },
  media: {
    component: dynamic(() => import('../tabs/media')),
  },
  socials: {
    background: {
      image: '/img/veiled_mama.png',
    },
    component: dynamic(() => import('../tabs/socials')),
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
  const style = { ...(props.style ?? {}) };
  const { route, background, children, style: _, ...rest } = props;
  const external = background || route.startsWith('http');
  const target = background ? '_blank' : undefined;
  const rel = background ? 'noreferrer' : undefined;

  if (props.disabled) {
    style.cursor = 'default';
    style.opacity = 0.5;
    style.pointerEvents = 'none';
  }

  return (
    <a
      href={props.disabled ? '' : route}
      onClick={e => {
        if (props.disabled) {
          e.preventDefault();
          return;
        }
        if (external) return;
        if (e.metaKey) return;
        e.preventDefault();
        push(route);
      }}
      target={target}
      rel={rel}
      style={style}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Router;
