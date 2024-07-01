import {
  normalize,
  normalizeHeight,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  FONT_FAMILY_SEMIBOLD,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  ThemeColorBox: {
    width: normalizeWidth(120),
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  box: {
    width: normalizeWidth(120),
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
  },
  smViewBox: {
    width: "25%",
    height: normalizeHeight(60),
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  boxText: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 16),
  },
  downloadImg: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    tintColor: WHITE_COLOR,
  },

  cTDataItems: {
    // width: normalizeWidth(130),
    // height: normalizeHeight(90),
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
  },
  dataItems: {
    width: "100%",
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
  },
  dataItemsForBM: {
    width: normalizeWidth(140),
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
  },
  title: {
    fontSize: 20,
    marginVertical: 2,
    fontFamily:FONT_FAMILY_SEMIBOLD,
    color:PRIMARY_THEME_COLOR
  },
});
export default styles;
