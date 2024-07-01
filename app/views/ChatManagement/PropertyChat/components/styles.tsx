import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  BORDER_COLOR,
  FONT_FAMILY_SEMIBOLD,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

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
  RightSecondIconStyle: {
    tintColor: WHITE_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  chatListView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: normalizeSpacing(15),
    borderBottomWidth: 0.6,
    borderBottomColor: BORDER_COLOR,
  },
  iconStyle: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
  },
  userText: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginLeft: normalize(20),
    color: PRIMARY_THEME_COLOR,
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
    // backgroundColor: "red",
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
  profileImage: {
    height: normalizeHeight(35),
    width: normalizeWidth(35),
    borderRadius: normalize(35),
  },
  straight: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
