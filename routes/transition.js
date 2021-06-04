import { motion, AnimatePresence } from 'framer-motion';
import Router from './router';
import {
  useCallback,
  useMemo,
  createContext,
  useContext,
  useState,
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
  const [animating, setAnimating] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [current, direction] = useMemo(() => {
    const current = Router.keys[page];
    const last = Router.keys[prev] ?? current - 1;
    const direction = current - last;
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
  return children;
  return (
    <TransitionContext.Provider value={{ animating: animating || dragging }}>
      <AnimatePresence>
        <motion.div
          key={current}
          initial="enter"
          animate="center"
          exit="exit"
          variants={{
            enter: {
              position: 'relative',
              x: direction > 0 ? w : -w,
              opacity: 0,
              minHeight: 0,
            },
            center: {
              position: 'relative',
              x: 0,
              opacity: 1,
              minHeight: h / 2,
            },
            exit: {
              position: 'absolute',
              x: direction < 0 ? w : -w,
              opacity: 0,
            },
          }}
          transition={{
            x: { type: 'spring', stiffness: 250, damping: 40 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragPropagation={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
            debounced2(() => setDragging(false));
          }}
          onAnimationStart={() => {
            setAnimating(true);
          }}
          onAnimationComplete={() => {
            debounced(() => setAnimating(false));
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
