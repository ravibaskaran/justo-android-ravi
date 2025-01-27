import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
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
  container: {
    backgroundColor: PRIMARY_THEME_COLOR,
    borderRadius: 10,
    margin: 5,
    paddingBottom: 20,
  },
  nameText: {
    color: PRIMARY_THEME_COLOR,
    fontWeight: "900",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 16),
    flex: 1,
    marginRight: 10,
  },
  childContainer2: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(2),
    borderBottomColor: WHITE_COLOR,
    borderBottomWidth: 2,
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    flex: 1,
    paddingVertical: normalizeSpacing(5),
    color: WHITE_COLOR,
    fontSize: normalize(11),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    textAlign: "center",
  },
  subHead: {
    color: WHITE_COLOR,
    fontWeight: "900",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 10 : 12),
    padding: 10,
    textAlign: "center",
  },
  date: {
    fontWeight: "900",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(Isios ? 14 : 13),
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  imageStyle: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
    tintColor: PRIMARY_THEME_COLOR,
  },

  nameContainer: {
    margin: 8,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
  },
});
export default styles;
