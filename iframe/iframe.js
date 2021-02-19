import { useEffect, useRef, useState } from 'react';

const color = {
  background: '#8eeeffab',
};

export function Iframe({ url, children, style, height }) {
  const frame = useRef();
  const [loading, setLoading] = useState(true);
  function onload() {
    setLoading(false);
  }
  useEffect(() => {
    const ref = frame.current;
    ref.addEventListener('load', onload);
    return () => {
      ref.removeEventListener('load', onload);
    };
  }, []);
  return (
    <iframe
      ref={frame}
      src={url}
      allow="autoplay *; fullscreen; encrypted-media *; fullscreen *; gyroscope; accelerometer; picture-in-picture"
      style={{
        background: 'transparent',
        zIndex: -1,
        animation: loading
          ? 'loadingshimmer 1s linear alternate infinite'
          : 'none',
        ...style,
      }}
      {...{ height }}
      frameBorder="0"
    >
      {children}
    </iframe>
  );
}

export function EmbeddedAlbum(props) {
  return (
    <Iframe
      style={{
        width: '100%',
        height: '300px',
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
