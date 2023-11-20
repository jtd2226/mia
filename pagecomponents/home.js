import World from 'GL/scene';
import Image from 'next/image';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Featured } from 'metadata';
// import { Link } from '../routes/router';

const images = [
  {
    src: '/img/MAMA/album_neverknew.jpeg',
    href: 'https://open.spotify.com/album/1EpBenE7byXtAUoLWBz1Ud',
  },
  Featured.album,
  {
    src: '/img/MAMA/album_last_time.jpg',
    href: 'https://open.spotify.com/track/0wB7ZBKtYtAXPwWrE65jUl',
  },
];

const Container = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

const Timer = {
  Interval(callback, duration) {
    const state = {
      id: null,
      start: null,
    };

    function observe(now) {
      state.start ??= now;
      const elapsed = now - state.start;

      if (elapsed >= duration) {
        state.start = now;
        callback();
      }

      state.id = requestAnimationFrame(observe);
    }

    function stop() {
      delete state.start;
      cancelAnimationFrame(state.id);
    }

    function start() {
      stop();
      state.id = requestAnimationFrame(observe);
    }

    return {
      start,
      stop,
    };
  },
};

function Carousel({ images }) {
  const [index, setIndex] = useState(0);
  const { src, href, ...rest } = images[index];
  const interval = useRef();

  const next = useCallback(() => {
    setIndex(old => {
      const next = old + 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images]);

  const reset = useCallback(() => {
    interval.current ??= Timer.Interval(next, 8000);
    interval.current.start();
  }, [next]);

  const back = useCallback(() => {
    reset();
    setIndex(old => {
      const next = old - 1;
      if (next < 0) return images.length - 1;
      return next;
    });
  }, [images, reset]);

  useEffect(() => {
    reset();

    return () => {
      interval.current?.stop();
    };
  }, [next]);

  return (
    <a href={href} target="_blank" rel="noreferrer" className="album-link">
      <span className="album">
        <span className="album-carousel">
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              back();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.729 84.721">
              <path
                d="M47.728 42.36C47.728 41.139 47.283 40.06 46.34 39.129L7.645 1.305C6.827.435 5.74 0 4.496 0 1.958 0 0 1.896 0 4.444 0 5.636.539 6.764 1.295 7.624L36.83 42.361 1.295 77.097C.539 77.957 0 79.034 0 80.277 0 82.826 1.958 84.721 4.496 84.721 5.739 84.721 6.826 84.286 7.646 83.416L46.34 45.594C47.283 44.66 47.728 43.584 47.728 42.36Z"
                fill="currentcolor"
              ></path>
            </svg>
          </button>
          <World
            images={src}
            amplitude={-5}
            glitch
            style={{ width: '275px', height: '275px' }}
            {...rest}
          />
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              reset();
              next();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.729 84.721">
              <path
                d="M47.728 42.36C47.728 41.139 47.283 40.06 46.34 39.129L7.645 1.305C6.827.435 5.74 0 4.496 0 1.958 0 0 1.896 0 4.444 0 5.636.539 6.764 1.295 7.624L36.83 42.361 1.295 77.097C.539 77.957 0 79.034 0 80.277 0 82.826 1.958 84.721 4.496 84.721 5.739 84.721 6.826 84.286 7.646 83.416L46.34 45.594C47.283 44.66 47.728 43.584 47.728 42.36Z"
                fill="currentcolor"
              ></path>
            </svg>
          </button>
        </span>
        <Image src="/text/albumtext.png" width={350} height={67} />
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <Container>
      {/* <Link route="presave">
        <a>Click to Pre-Save</a>
      </Link> */}
      <Carousel images={images} />
    </Container>
  );
}
