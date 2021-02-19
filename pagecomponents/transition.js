import { motion, AnimatePresence } from 'framer-motion';
import Router from '../pagecomponents/router';
import { useCallback, useMemo } from 'react';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function PageTransition({ children }) {
  const { page, prev, push } = Router.use();
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
  return (
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
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
