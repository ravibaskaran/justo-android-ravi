import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1,
  },
  propertyListView: {
    flex: 1,
  },
  topDetailsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(10),
    alignItems: "center",
  },
  topTxtView: {
    flexDirection: "row",
    alignItems: "center",
  },
  topTxt: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_EXTRABOLD,
    fontSize: normalize(18),
  },
  qrView: {
    alignItems: "center",
    justifyContent: "center",
  },
  qrImg: {
    width: normalizeWidth(80),
    height: normalizeHeight(80),
  },
  Txtview: {
    flexDirection: "row",
    // justifyContent: 'center',
    // alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: normalizeSpacing(10),
  },
  projectContainer: {
    flex: 2.5,
    alignItems: "flex-start",
    height: "100%",
    marginLeft: normalizeSpacing(15),
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR,
  },
  nameContainer: {
    flex: 3.5,
    alignItems: "flex-start",
  },
  nameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10),
  },
  bntView: {
    marginVertical: normalizeSpacing(10),
  },
  bottomView: {
    alignItems: "center",
    marginVertical: normalizeSpacing(20),
  },
  topBtnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(50),
    height: normalizeHeight(25),
    marginLeft: normalizeSpacing(10),
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  buttonTxt: {
    color: BLACK_COLOR,
    textAlign: "center",
  },
  btnWrap:{
    flexDirection :'row',
    justifyContent :'center'
  }
});

export default styles;
