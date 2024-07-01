import {Dimensions, StyleSheet} from 'react-native';
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from '../../../../components/scaleFontSize';
import {
  FONT_FAMILY_SEMIBOLD,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
} from '../../../../components/utilities/constant';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  loginBanner: {
    width: width,
        height: 220,
  },
  logoImage: {
    height: normalizeHeight(150),
    width: normalizeWidth(200),
  },
  inputView: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  inputWrap: {
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(20),
  },
  forgotTouch: {
    alignItems: 'flex-end',
    marginHorizontal: normalizeSpacing(20),
  },
  forgotText: {
    fontSize: normalize(15),
    fontWeight: '600',
    color: PRIMARY_THEME_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  bottomView: {
    flex: 2,
    alignContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: normalizeSpacing(40),
    marginHorizontal: normalizeSpacing(10),
  },
  dontHaveView: {
    flexDirection: 'row',
    marginHorizontal: normalizeSpacing(20),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: normalizeSpacing(20),
  },
  dontText: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  registerTouch: {
    paddingHorizontal: normalizeSpacing(3),
  },
  registerText: {
    fontSize: normalize(15),
    color: PRIMARY_THEME_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: normalize(14),
    lineHeight: normalizeHeight(25),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR
  },
  spanTouch: {
    // backgroundColor: 'red',
  },
  spanText: {
    textAlign: 'center',
    fontSize: normalize(14),
    lineHeight: normalizeHeight(25),
    color: PRIMARY_THEME_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  btnView: {
    marginVertical: 20
  }
});

export default styles;
