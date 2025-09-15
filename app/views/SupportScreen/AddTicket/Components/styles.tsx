import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_MEDIUM, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  topItemsVw: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16)
  },
  inputWrap: {
    marginVertical: normalizeSpacing(10),
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: GRAY_LIGHT_COLOR
  },
  attachView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  attachbtn: {
    width: normalizeWidth(120),
    height: normalizeHeight(50),
    backgroundColor: PRIMARY_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 10,
  },
  attachTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_MEDIUM
  },
  attachTxt1: {
    color: BLACK_COLOR,
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_MEDIUM
  }
})

export default styles