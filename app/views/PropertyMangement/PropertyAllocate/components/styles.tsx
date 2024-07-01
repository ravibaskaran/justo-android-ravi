import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeWidth,
  normalizeSpacing,
} from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_REGULAR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
  FONT_FAMILY_SEMIBOLD,
} from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE_COLOR
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  headerTextStyle: {
    color: WHITE_COLOR,
  },
  containerVw: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(12),
    backgroundColor: WHITE_COLOR,
    flex: 1
  },
  headerTxt: {
    fontSize: normalize(16),
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  selectedBox: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalizeSpacing(10),
    borderWidth: 1,
    borderColor: PRIMARY_THEME_COLOR,
    marginVertical: normalize(8),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderRadius: normalize(10),
    // flex: 1,
  },
  noSelectedTxt: {
    fontSize: normalize(14),
    color: GRAY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    paddingHorizontal: 8,
  },
  innerBoxVw: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 5,
    //paddingHorizontal: 15,
    marginVertical: 5,
    minWidth: 50,
    justifyContent: "space-between",
    //backgroundColor:'red',
    //borderRadius:3,
    borderWidth: 1,
    // borderColor: GRAY_COLOR,
  },
  innerBoxVwlist: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: normalize(12),
    marginVertical: normalize(10),
    minWidth: normalizeWidth(70),
    justifyContent: "space-between",
  },

  btncontener: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'flex-end',
    // marginHorizontal: normalizeSpacing(10),
    // marginVertical: normalizeSpacing(8),
    backgroundColor: WHITE_COLOR
  },
  userNameTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    maxWidth: '90%'
  },
  innerBoxVwlistfont: {
    fontSize: 15,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    width: "90%"
  },
  searchInputVw: {
    marginVertical: normalizeSpacing(8),
    height: 40,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 14,
    color: BLACK_COLOR,
    backgroundColor: WHITE_COLOR,
    elevation: 1,
    paddingLeft: 20,
    borderRadius: 10,
  },
  crossVw: {
    width: normalizeWidth(15),
    height: normalizeHeight(15),
    marginHorizontal: 5,
  },
  checkBoxVw: {
    backgroundColor: WHITE_COLOR,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 2,
  },
  checksVw: {
    width: normalizeWidth(5),
    height: normalizeHeight(10),
    marginHorizontal: 5,
  },
});
export default styles;
