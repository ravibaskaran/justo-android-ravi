import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const scale = width / 320;
const normalize = (size: number) => {
  const newSize = size * scale;
  let finalFontSize = Math.round(PixelRatio.roundToNearestPixel(newSize));
  switch (true) {
    case PixelRatio.get() <= 1.75:
      finalFontSize -= 2;
      break;
    case PixelRatio.get() <= 2 && height <= 670 && width <= 380:
      finalFontSize -= 0.5;
      break;
    case PixelRatio.get() <= 2:
      finalFontSize -= 2.5;
      break;
    case PixelRatio.get() <= 3:
      finalFontSize -= 1.5;
      break;
    case PixelRatio.get() <= 3.5:
      finalFontSize -= 4;
      break;
    default:
      finalFontSize -= 2;
      break;
  }
  return finalFontSize;
};

const normalizeHeight = (elementHeight: number) => {
  let elementHeightResult = 0;
  switch (true) {
    case PixelRatio.get() <= 1.75:
      elementHeightResult = elementHeight + 0.5;
      break;
    case PixelRatio.get() <= 2:
      elementHeightResult = elementHeight + 1;
      break;
    case PixelRatio.get() <= 3:
      elementHeightResult = elementHeight + 3;
      break;
    case PixelRatio.get() <= 3.5:
      elementHeightResult = elementHeight + 5;
      break;
    default:
      elementHeightResult = elementHeight + 0.5;
      break;
  }
  return elementHeightResult;
};

const normalizeWidth = (elementWidth: number) => {
  let elementWidthResult = 0;
  switch (true) {
    case PixelRatio.get() <= 1.75:
      elementWidthResult = elementWidth + 0.5;
      break;
    case PixelRatio.get() <= 2:
      elementWidthResult = elementWidth + 1;
      break;
    case PixelRatio.get() <= 3:
      elementWidthResult = elementWidth + 3;
      break;
    case PixelRatio.get() <= 3.5:
      elementWidthResult = elementWidth + 5;
      break;
    default:
      elementWidthResult = elementWidth + 0.5;
      break;
  }
  return elementWidthResult;
};

const normalizeSpacing = (elementSpacing: number) => {
  let elementSpacingResult = 0;
  switch (true) {
    case width < 395:
    case width === 395:
    case width < 420 && height < 700:
      elementSpacingResult = elementSpacing + 0;
      break;
    case width > 410 && width < 490:
      elementSpacingResult = elementSpacing + 2;
      break;
    case width > 500 && width < 590:
      elementSpacingResult = elementSpacing + 5;
      break;
    case width > 600 && width < 690:
      elementSpacingResult = elementSpacing + 6;
      break;
    default:
      elementSpacingResult = elementSpacing + 0;
      break;
  }
  return elementSpacingResult;
};

export {normalize, normalizeHeight, normalizeWidth, normalizeSpacing};
