import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
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
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
  },
  text: {
    color: BLACK_COLOR,
    padding: normalize(12),
    borderWidth: normalize(Isios ? 1.2 : 2),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 16),
    minWidth: normalize(120),
    maxWidth: normalize(150),
  },
  itemBox: {
    flex: 1,
    borderWidth: normalize(Isios ? 1.2 : 2),
    padding: normalize(12),
    backgroundColor: PRIMARY_THEME_COLOR,
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 16),
  },
  cardText: {
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 14),
    paddingVertical: 2,
  },
  imageContainer: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    color: WHITE_COLOR,
    fontWeight: "900",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 16),
    paddingHorizontal:10
  },
  container: {
    flexDirection: "row",
    backgroundColor: PRIMARY_THEME_COLOR,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 20,
  },

  childContainer: {
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  date: {
    fontWeight: "900",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 13),
  },

  text1: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 14),
    paddingVertical: 2,
    fontWeight: "700",
  },
  smallContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  text2: {
    flex: 0.5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  boxcontent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  itemText: {
    flex: 1,
    paddingVertical: normalizeSpacing(5),
    color: WHITE_COLOR,
    fontSize: normalize(11),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    textAlign: "center",
  },

  childContainer2: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(2),
    borderBottomColor: WHITE_COLOR,
    borderBottomWidth: 2,
    alignItems: "center",
    flex: 1,
  },
  nameContainer:{
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  }
});
export default styles;
