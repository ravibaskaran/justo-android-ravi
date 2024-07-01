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
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";

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
  propertyListView: {
    flex: 1,
    margin: normalizeSpacing(10),
  },
  IteamView: {
    backgroundColor: WHITE_COLOR,
    marginHorizontal: normalizeSpacing(10),
    borderRadius: 10,
    marginVertical: normalizeSpacing(10),
  },
  Txtview: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    padding: normalizeSpacing(4),
    marginTop: normalizeSpacing(2),
  },
  projectContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  nameContainer: {
    flex: 1.5,
    alignItems: "flex-start",
  },
  nameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: normalizeSpacing(10),
  },
  button: {
    top: 10,
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(100),
    height: normalizeHeight(25),
    marginLeft: normalizeSpacing(10),
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  Viewbutton: {
    top: 10,
    backgroundColor: PRIMARY_THEME_COLOR,
    borderBottomEndRadius: 10,
    borderTopLeftRadius: 10,
    padding: normalizeSpacing(5),
  },
  arrow: {
    tintColor: WHITE_COLOR,
    width: normalizeWidth(30),
    height: normalizeHeight(30),
  },
  buttonTxt: {
    color: BLACK_COLOR,
    textAlign: "center",
  },
  bottomTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
  },
  closeIcon: {
    tintColor: "red",
    width: normalizeWidth(30),
    height: normalizeHeight(30),
  },
  inputWrap: {
    marginTop: normalizeSpacing(20),
    width: "100%",
  },
  bookingModelVw: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  topTxt: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_EXTRABOLD,
    fontSize: normalize(18),
  },
  descText: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: normalize(16),
  },
  topContainer: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(10),
    justifyContent: "space-between",
    marginHorizontal: normalizeSpacing(10),
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
  },
});
export default styles;
