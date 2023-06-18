export const color = {
  white: '#efefef',
  angel: '#e7bba5',
  pink: '#d0c6ffb8',
  blue: '#0196ff40',
  textShadow: {
    primary: '#d0c6ffb8',
    secondary: '#0196ff40',
  },
};

const dimensions = {
  width: '1000px',
};

const zIndex = {
  none: '-1',
  bottom: '0',
  normal: '1',
  middle: '10',
  top: '20',
};

export const animation = {
  wobbledywop: 'wobbledywop 3s infinite',
  spin: 'spin 0.5s forwards infinite',
  slideup: 'slideup 2s ease-in-out',
  fadein: 'fadein 1s ease-in',
  slidedown: 'slidedown 2s ease-in-out',
};

export const MIA = {
  color: color.angel,
  cursor: 'pointer',
  fontSize: '40px',
  textShadow: `rgb(102 102 104 / 72%) 6px 6.5px 6px`,
  textAlign: 'center',
  fontFamily: 'Agresiva',
  margin: '50px',
  letterSpacing: '3px',
  // animation: `${animation.slidedown}, ${animation.wobbledywop}`,
};

export const header = {
  color: 'rgb(31 90 228 / 70%)',
  textAlign: 'center',
  margin: '15px 0 30px 0',
  animation: animation.fade,
  boxSizing: 'border-box',
  display: 'block',
  fontWeight: 'bold',
  fontSize: 'xx-large',
  textDecoration: 'none',
};

export const contact = {
  color: color.white,
  position: 'absolute',
  top: '10px',
  right: '20px',
  fontFamily: 'Cute',
};

export const socialContainer = {
  display: 'flex',
  // width: dimensions.width,
  minWidth: '50vw',
  boxSizing: 'border-box',
  flexWrap: 'wrap',
  zIndex: zIndex.top,
  justifyContent: 'space-around',
  animation: animation.fadein,
};

export const socialOffset = {
  display: 'flex',
  width: dimensions.width,
  marginRight: '30px',
  // width: '100vw',
  boxSizing: 'border-box',
  maxWidth: '100vw',
  flexWrap: 'wrap',
  zIndex: zIndex.top,
  justifyContent: 'flex-end',
  animation: animation.fadein,
};

export const logo = {
  fb: {
    backgroundColor: '#1877f2',
    borderRadius: '50%',
  },
  yt: { borderRadius: '50%' },
  tiktok: { borderRadius: '50%', backgroundColor: 'black' },
  spotify: {
    borderRadius: '50%',
  },
};

export const navbar = {
  display: 'flex',
  width: dimensions.width,
  boxSizing: 'border-box',
  maxWidth: '95vw',
  flexWrap: 'wrap',
  zIndex: '2000',
  gap: '12px',
  justifyContent: 'space-around',
  transition: 'background-color 0.5s',
  position: 'sticky',
  animation: animation.fadein,
  top: '0',
};

export const pageLink = {
  color: color.angel,
  fontSize: '40px',
  fontWeight: 'bold',
  textShadow: `rgb(102 102 104 / 72%) 6px 6.5px 6px`,
  transition: 'transform 0.5s',
  fontFamily: 'Agresiva',
  letterSpacing: '3px',
  pointerEvents: 'all',
  cursor: 'pointer',
  boxSizing: 'border-box',
  selected: {
    transform: 'scale(1.25)',
  },
};

export const tabContent = {
  marginTop: '30px',
  marginRight: '12px',
  width: '600px',
  boxSizing: 'border-box',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  position: 'relative',
};
