import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import {
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR
} from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: WHITE_COLOR,
    borderBottomColor: "black",
    justifyContent: "center",
    marginHorizontal: normalizeSpacing(20),
    borderRadius: normalizeSpacing(10),
    minHeight: normalizeHeight(82),
    flex: 1,
    padding: normalizeSpacing(10),
    marginVertical: normalizeSpacing(10),
  },
  rowBack: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    minHeight: 0,
    flex: 1,
    paddingBottom: 14,
    marginTop: normalizeHeight(10)
  },
  backRightBtn: {
    justifyContent: "center",
    width: normalizeWidth(40),
    height: normalizeHeight(35),
    borderTopRightRadius: normalizeSpacing(10),
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    top: 0,
  },
  timeShwVw: {
    marginLeft: normalizeSpacing(6),
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginTop: normalizeSpacing(20),
  },
  trashIconVw: {
    width: normalizeWidth(22),
    height: normalizeHeight(22),
    tintColor: PRIMARY_THEME_COLOR
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  subjectText: {
    fontSize: normalize(16),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    padding: normalizeSpacing(5),
    width: '94%',
  },
  messageText: {
    fontSize: normalize(14),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    paddingHorizontal: normalizeSpacing(5),
    marginBottom: normalizeSpacing(20),
  },
  timeText: {
    fontSize: normalize(12),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    paddingRight: normalizeSpacing(5),
    paddingBottom: normalizeSpacing(5),
  },
});

export default styles;
