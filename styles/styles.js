export const color = {
  white: '#efefef',
  angel: '#e7bba5',
  pink: '#d0c6ffb8',
  blue: '#0196ff40',
  textShadow: {
    primary: '#d0c6ffb8',
    secondary: '#0196ff40',
  },
  gray: '#808080a6',
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

export const nav = {
  position: 'sticky',
  top: '0',
  zIndex: zIndex.top,
  textAlign: 'end',
  paddingTop: '24px',
  paddingBottom: '8px',
  paddingLeft: '12px',
  paddingRight: '12px',
  animation: animation.fadein,
  boxSizing: 'border-box',
  display: 'flex',
  fontSize: 'xx-large',
  textDecoration: 'none',
  width: '100%',
  fontFamily: 'Acylical Hand Thick',
  alignItems: 'flex-end',
  alignContent: 'flex-end',
  gap: '20px',
  backgroundColor: '#010101',
  flexWrap: 'wrap',
};

export const contact = {
  color: color.white,
  position: 'absolute',
  top: '10px',
  right: '20px',
  fontFamily: 'Cute',
};

export const pages = {
  socials: {
    main: {
      flex: '1 0 auto',
      justifyContent: 'center',
    },
    container: {
      display: 'flex',
      // width: dimensions.width,
      minWidth: '50vw',
      boxSizing: 'border-box',
      flexWrap: 'wrap',
      zIndex: zIndex.top,
      justifyContent: 'space-around',
      animation: animation.fadein,
    },
    bgimage: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
    },
  },
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
  main: {
    height: '40px',
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
  color: color.white,
  fontSize: '24px',
  transition: 'transform 0.5s',
  fontFamily: 'Acylical Hand Thick',
  pointerEvents: 'all',
  cursor: 'pointer',
  boxSizing: 'border-box',
  selected: {
    transform: 'scale(1.25)',
  },
};

export const videos = {
  display: 'flex',
  width: '100%',
  overflow: 'auto',
  flex: '1 0 auto',
  gap: '12px',
};

export const form = {
  mailingList: {
    section: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      minHeight: '250px',
    },
    iframe: {
      width: 'min(100%, 700px)',
      zIndex: zIndex.normal,
      position: 'absolute',
    },
    canvas: {
      width: '100%',
      zIndex: zIndex.bottom,
    },
    input: {
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      borderBottom: `1px solid ${color.white}`,
      backgroundColor: 'transparent',
      color: color.white,
      fontSize: '18px',
      minWidth: '250px',
    },
    button: {
      backgroundColor: 'transparent',
      padding: '6px',
      color: color.white,
      border: '1px solid ' + color.white,
      fontWeight: 'bolder',
    },
    container: {
      position: 'absolute',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    notice: {
      display: 'block',
      fontFamily: 'Plantagenet Cherokee',
      color: color.white,
      width: '100%',
      textAlign: 'center',
      padding: '12px',
      fontSize: '20px',
      fontWeight: 'bolder',
      margin: 0,
    },
  },
};
