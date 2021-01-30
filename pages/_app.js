import '../styles/globals.css';
import '../styles/animations.css';
import Scene from '../scene/scene';
import { useEffect, StrictMode } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    new Scene(document.getElementById('scene'));
  }, []);
  return (
    <StrictMode>
      <canvas id="scene"></canvas>
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
