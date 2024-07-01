import {StyleSheet} from 'react-native';
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from '../scaleFontSize';
import {FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR} from '../utilities/constant';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: normalizeSpacing(20),
  },
  btnTouch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: normalize(20),
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD
  },
  rightImageView: {
    position: 'absolute',
    right: 0,
    marginRight: normalizeSpacing(15)
  }
});

export default styles;
