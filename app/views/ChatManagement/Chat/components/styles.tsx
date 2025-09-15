import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  BORDER_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR
} from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 20,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  chatListView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: normalizeSpacing(15),
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  propertyText: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginLeft: normalize(20),
    color: PRIMARY_THEME_COLOR,
  },
  iconStyle: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
  },
  straight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: normalizeHeight(35),
    width: normalizeWidth(35),
    borderRadius: normalize(35),
  },
  sendIconView: {
    marginRight: normalizeSpacing(0),
    height: normalizeSpacing(40),
    width: normalizeSpacing(40),
    borderWidth: 0,
    borderRadius: 40,
    backgroundColor: PRIMARY_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  sendImage: {
    height: normalizeHeight(25),
    width: normalizeWidth(25),
    tintColor: WHITE_COLOR,
  },
  attachIconView: {
    marginRight: normalizeSpacing(0),
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    flexDirection: "row",
  },
  attachIconImage: {
    height: normalizeHeight(30),
    width: normalizeWidth(30),
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  chatPrimaryInputStyle: {
    // marginBottom: normalizeSpacing(15),
    borderWidth: 1,
    borderRadius: normalize(10),
    borderColor: PRIMARY_THEME_COLOR,
  },
  chatContainerInputStyle: {
    marginHorizontal: normalizeSpacing(15),
    borderWidth: 0,
    width: "80%",
    justifyContent: "center",
    borderRadius: normalize(10),
  },
  imageMessageView: {
    height: normalizeHeight(200),
    width: normalizeWidth(200),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: PRIMARY_THEME_COLOR,
    borderWidth: 4,
  },
  senderpdfMessageView: {
    height: normalizeHeight(50),
    width: normalizeWidth(200),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
  },
  recieverpdfMessageView: {
    height: normalizeHeight(50),
    width: normalizeWidth(230),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  pdfnameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginLeft: normalize(20),
    color: WHITE_COLOR,
  },
  pdfRecievednameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginLeft: normalize(20),
    color: BLACK_COLOR,
  },
  downloadImage: {
    height: normalizeHeight(30),
    width: normalizeWidth(30),
    tintColor: BLACK_COLOR,
    padding: normalizeSpacing(10),
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: PRIMARY_THEME_COLOR,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: normalize(20),
  },
  dotWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  playbutton:{
    position: 'relative',
    bottom: normalizeSpacing(260),
    backgroundColor: WHITE_COLOR,
    borderRadius: normalizeSpacing(25)
  },
  playButtonWrap: {
    alignItems: 'center'
  }
});
export default styles;
