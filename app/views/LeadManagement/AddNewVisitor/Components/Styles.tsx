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
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  Isios,
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
  wrap: {
    flex: 1,
    margin: normalizeSpacing(10),
    // alignItems: 'center'
  },
  headingText: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
    textAlign: "center",
  },
  underlineStyle: {
    width: normalizeWidth(60),
    height: normalizeHeight(1),
    backgroundColor: GRAY_COLOR,
    marginTop: normalizeSpacing(5),
  },
  imageCircle: {
    backgroundColor: GRAY_COLOR,
    marginVertical: normalizeSpacing(10),
    borderRadius: normalizeSpacing(100),
    height: normalizeHeight(120),
    width: normalizeWidth(120),
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrap: {
    marginTop: normalizeSpacing(30),
  },
  genderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: normalizeSpacing(10),
    width: "100%",
  },
  genderTxt: {
    fontSize: normalize(15),
    // fontWeight: 'bold',
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  radioBtnView: {
    width: "100%",
    marginVertical: normalizeSpacing(20),
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: normalizeSpacing(2),
  },
  radioTxt: {
    fontSize: normalize(14),
    color: BLACK_COLOR,
  },
  smallCont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalizeSpacing(8),
    marginLeft: normalizeSpacing(6),
    marginTop: normalize(14),
  },
  workingView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: normalizeSpacing(10),
  },
  addBtn: {
    backgroundColor: PRIMARY_THEME_COLOR,
    width: normalizeWidth(140),
    height: normalizeHeight(25),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: {
    color: WHITE_COLOR,
    textTransform: "uppercase",
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  workTxt: {
    color: BLACK_COLOR,
    textTransform: "uppercase",
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalizeSpacing(20),
  },
  budgetView: {
    flexDirection: "row",
    height: normalizeHeight(50),
  },
  inputContVw: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  smallContVw: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  smallBox: {
    width: "15%",
    backgroundColor: WHITE_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 10,
    height: normalizeHeight(50),
  },
  budgetInput: {
    backgroundColor: WHITE_COLOR,
    width: "55%",
    height: normalizeHeight(50),
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderColor: GRAY_COLOR,
    color: BLACK_COLOR,
    paddingLeft: normalizeSpacing(8),
    fontSize: 14,
  },
  headingsTxt: {
    fontSize: normalize(16),
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  bottomView: {
    flex: 2,
    // width: '80%',
    alignContent: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: normalizeSpacing(10),
  },
  spanTouch: {
    flexDirection: "row",
  },
  spanText: {
    textAlign: "center",
    fontSize: normalize(14),
    // lineHeight: normalizeHeight(10),
    color: PRIMARY_THEME_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  bottomText: {
    textAlign: "center",
    fontSize: normalize(14),
    lineHeight: normalizeHeight(25),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR,
  },
  bottomContentView: {
    flexDirection: "row",
    // width: '80%',
  },
  tickImgVw: {
    backgroundColor: PRIMARY_THEME_COLOR,
    borderRadius: normalize(50),
    marginRight: normalize(15),
    padding: normalize(2),
  },
  tickImg: {
    height: normalizeHeight(18),
    width: normalizeWidth(18),
    // tintColor: WHITE_COLOR,
    margin: 0,
    // backgroundColor: 'red',
    marginLeft: 0
  },
  borderView: {
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: normalizeSpacing(5),
    justifyContent: "space-between",
    marginHorizontal: normalizeSpacing(10),
    color: PRIMARY_THEME_COLOR,
  },
  closeIcon: {
    tintColor: "red",
    width: normalizeWidth(25),
    height: normalizeHeight(25),
  },
  conteconfirm: {
    flexDirection: "column",
    backgroundColor: WHITE_COLOR,
    paddingVertical: normalizeSpacing(12),
    borderRadius: normalize(10),
  },
  topTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_EXTRABOLD,
  },
  bottomTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
  },
  MiddleContainer: {
    marginVertical: normalizeSpacing(25),
    marginHorizontal: normalizeSpacing(30),
  },
  btnview: {
    width: "49%",
    height: normalizeHeight(50),
  },
});

export default styles;
