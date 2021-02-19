export const color = {
  white: '#efefef',
  pink: '#f9d0df',
  blue: '#8eeeffab',
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
  color: color.white,
  cursor: 'pointer',
  fontSize: '100px',
  textShadow: `-3px -1.5px 0px ${color.pink}, 3px 1.5px 0 ${color.blue}`,
  textAlign: 'center',
  margin: 0,
  animation: `${animation.slidedown}, ${animation.wobbledywop}`,
};

export const header = {
  color: 'rgb(31 90 228 / 70%)',
  textAlign: 'center',
  margin: '15px 0 30px 0',
  animation: animation.fade,
  padding: '0 0.5rem',
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
  width: dimensions.width,
  padding: '0 0.5rem',
  boxSizing: 'border-box',
  maxWidth: '100vw',
  flexWrap: 'wrap',
  zIndex: zIndex.top,
  gap: '20px 50px',
  justifyContent: 'space-around',
  margin: '15px 0',
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
  padding: '0 0.5rem',
  boxSizing: 'border-box',
  maxWidth: '100vw',
  flexWrap: 'wrap',
  zIndex: '2000',
  justifyContent: 'space-around',
  margin: '15px 0',
  transition: 'background-color 0.5s',
  position: 'sticky',
  animation: animation.fadein,
  top: '0',
};

export const pageLink = {
  color: color.white,
  padding: '12px',
  fontSize: 'xx-large',
  fontWeight: 'bold',
  textShadow: `-1.5px -1.5px 0px ${color.textShadow.primary}, 1.5px 1.5px 0 ${color.textShadow.secondary}`,
  transition: 'transform 0.5s',
  pointerEvents: 'all',
  cursor: 'pointer',
  selected: {
    transform: 'scale(1.35)',
    margin: '0 12px',
    textShadow: `-3px -3px 0px ${color.textShadow.primary}, 3px 3px 0 ${color.textShadow.secondary}`,
  },
};

export const tabContent = {
  marginTop: '20px',
  width: dimensions.width,
  padding: '0 0.5rem',
  boxSizing: 'border-box',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  position: 'relative',
};
