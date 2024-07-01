import { StyleSheet } from "react-native";
import { normalizeSpacing, normalize, normalizeWidth, normalizeHeight } from "../scaleFontSize";
import { PRIMARY_THEME_COLOR, BLACK_COLOR, FONT_FAMILY_EXTRABOLD, WHITE_COLOR, GRAY_COLOR } from "../utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(10),
    justifyContent: "space-between",
    marginHorizontal: normalizeSpacing(10),
    color: PRIMARY_THEME_COLOR
  },
  topTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  closeIcon: {
    tintColor: WHITE_COLOR,
    width: normalizeWidth(25),
    height: normalizeHeight(25),
  },
  playicon: {
    tintColor: BLACK_COLOR,
    width: normalizeWidth(35),
    height: normalizeHeight(35),
    padding: 10
  },
  borderView: {
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
  },
  playbutton: {
    position: 'relative',
    bottom: normalizeSpacing(260),
    backgroundColor: WHITE_COLOR,
    borderRadius: normalizeSpacing(25)
  },
  playButtonWrap: {
    alignItems: 'center',
    zIndex: 99999,
    backgroundColor: 'red',
    position: 'relative'
  }
})

export default styles