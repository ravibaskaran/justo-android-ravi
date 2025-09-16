// React Native Fast Image stub for web
import React from 'react';

const FastImage = ({ source, style, ...otherProps }) => {
  // Convert React Native Fast Image to standard web img
  const src = typeof source === 'object' ? source.uri : source;
  
  return React.createElement('img', {
    src,
    style: {
      ...style,
      // Convert React Native styles to web-compatible styles
      objectFit: style?.resizeMode || 'cover'
    },
    ...otherProps
  });
};

// Static properties and constants
FastImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'fill',
  center: 'none'
};

FastImage.priority = {
  low: 'low',
  normal: 'normal', 
  high: 'high'
};

FastImage.cacheControl = {
  immutable: 'immutable',
  web: 'web',
  cacheOnly: 'cacheOnly'
};

export default FastImage;