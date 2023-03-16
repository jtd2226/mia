import { useEffect, useRef, useState, useMemo } from 'react';
import { useTransition } from '../routes/transition';
const color = {
  background: '#8eeeffab',
};

const Loader = ({ children, style }) => <div style={style}>{children}</div>;

export function Iframe({ url, children, style, height }) {
  const frame = useRef();
  const [loading, setLoading] = useState(true);
  const { animating } = useTransition();
  const isLoading = useMemo(() => loading || animating, [loading, animating]);
  function onLoadStart() {
    setLoading(true);
  }
  function onload() {
    setLoading(false);
  }
  useEffect(() => {
    if (!frame) return;
    const ref = frame.current;
    ref.addEventListener('loadstart', onLoadStart);
    ref.addEventListener('load', onload);
    return () => {
      ref.removeEventListener('load', onload);
      ref.removeEventListener('loadstart', onLoadStart);
    };
  }, []);
  return (
    <>
      <iframe
        ref={frame}
        src={url}
        allow="autoplay *; fullscreen; encrypted-media *; fullscreen *; gyroscope; accelerometer; picture-in-picture"
        style={{
          ...style,
          display: isLoading ? 'none' : style.display || 'block',
          background: isLoading ? style.background : 'transparent',
          border: style.border ?? 'none',
        }}
        {...{ height }}
      >
        {children}
      </iframe>
      {isLoading && <Loader style={style}>{children}</Loader>}
    </>
  );
}

export function EmbeddedAlbum(props) {
  return (
    <Iframe
      style={{
        width: '100%',
        height: props.compact ? '80px' : props.height ?? '300px',
        borderRadius: '8px',
        marginBottom: '20px',
        background: color.background,
        ...props.style,
      }}
      {...props}
    />
  );
}

export function EmbeddedVideo({ url }) {
  return (
    <Iframe
      url={url}
      style={{
        borderRadius: '8px',
        width: '1000px',
        maxWidth: '100%',
        height: '500px',
        maxHeight: '90vw',
        marginBottom: '20px',
        background: color.background,
      }}
    />
  );
}
