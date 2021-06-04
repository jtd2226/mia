import Router from './router';
import {
  useCallback,
  useMemo,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

function debounce(fn, wait = 400) {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        timeout = null;
        resolve(fn(...args));
      }, wait);
    });
  };
}
const debounced = debounce(callback => callback(), 300);
const debounced2 = debounce(callback => callback(), 300);

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const TransitionContext = createContext({});
export const useTransition = () => useContext(TransitionContext);

export default function PageTransition({ children }) {
  const { page, prev, push } = Router.use();
  const ref = useRef();
  const [animating, setAnimating] = useState(false);

  const [current, direction] = useMemo(() => {
    const current = Router.keys[page];
    const last = Router.keys[prev] ?? current - 1;
    const direction = current - last;
    if (ref.current) {
      ref.current.classList.add('fadein');
      ref.current.onanimationend = () =>
        ref.current?.classList.remove('fadein');
    }
    return [current, direction];
  }, [page, prev]);
  const w = process.browser ? window.innerWidth : 1000;
  const h = process.browser ? window.innerHeight : 500;

  const paginate = useCallback(
    direction => {
      push(Router.keys[current + direction]);
    },
    [current, direction]
  );

  return (
    <TransitionContext.Provider value={{ animating: animating }}>
      <div ref={ref}>{children}</div>
    </TransitionContext.Provider>
  );
}
