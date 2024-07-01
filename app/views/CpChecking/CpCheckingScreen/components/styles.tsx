import { normalizeSpacing, normalize } from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
} from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: normalizeSpacing(10),
    marginTop: normalizeSpacing(10)
  },
  headingView: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(2),
    borderBottomColor: PRIMARY_THEME_COLOR,
    borderBottomWidth: 3,
    alignItems: "center",
  },
  headingText: {
    // flex: 1,
    // padding: normalizeSpacing(5),
    color: PRIMARY_THEME_COLOR,
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    // textAlign: "center",
  },
  dataView: {
    flexDirection: "row",
  },
  dataTxt: {
    // flex: 1,
    padding: normalizeSpacing(5),
    color: BLACK_COLOR,
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
  },
  listView: {
    flex: 1,
  },
  heddingBox: {
    flex: 2,
    alignItems: 'center'
  },
  dataBox: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: WHITE_COLOR_LIGHT,
    marginVertical: normalizeSpacing(5),
    borderBottomColor: PRIMARY_THEME_COLOR,
    borderBottomWidth: 0.5,
  }
});

export default styles;
