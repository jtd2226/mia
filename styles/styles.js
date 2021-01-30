export const color = {
  white: '#efefef',
  pink: '#f6afc9',
  blue: '#0ea8d9',
};

const dimensions = {
  containerWidth: '1000px',
};

const zIndex = {
  none: '-1',
  bottom: '0',
  normal: '1',
  middle: '10',
  top: '20',
};

const animation = {
  wobbledywop: 'wobbledywop 3s infinite',
  spin: 'spin 0.5s forwards infinite',
  slideup: 'slideup 2s ease-in-out',
  fadein: 'fadein 1s ease-in',
  slidedown: '2s ease-in-out',
};

export const MIA = {
  color: color.white,
  fontSize: '100px',
  textShadow: `-3px -1.5px 0px ${color.pink}, 3px 1.5px 0 ${color.blue}`,
  paddingTop: '20px',
  textAlign: 'center',
  margin: 0,
  animation: animation.wobbledywop,
};

export const socialContainer = {
  display: 'flex',
  width: '100%',
  maxWidth: dimensions.containerWidth,
  flexWrap: 'wrap',
  zIndex: zIndex.top,
  justifyContent: 'space-around',
  margin: '30px 0 15px 0',
  animation: animation.fadein,
};

export const logo = {
  fb: {
    backgroundColor: '#1877f2',
    borderRadius: '10px',
  },
  yt: { borderRadius: '10px' },
};
