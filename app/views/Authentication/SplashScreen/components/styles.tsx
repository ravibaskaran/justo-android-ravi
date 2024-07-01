import {Dimensions, StyleSheet} from 'react-native';
import {normalize, normalizeHeight} from '../../../../components/scaleFontSize';
import { FONT_FAMILY_EXTRABOLD, WHITE_COLOR } from '../../../../components/utilities/constant';

const width = Dimensions.get("screen")
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE_COLOR
  },
  justoText: {
    fontSize: normalize(40),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  justoImage: {
    width: width.width,
    height: width.height
  }
});

export default styles;
