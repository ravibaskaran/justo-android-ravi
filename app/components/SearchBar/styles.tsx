import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../scaleFontSize";
import {
  Isios,
  FONT_FAMILY_SEMIBOLD,
  GRAY_LIGHT_COLOR,
  WHITE_COLOR,
  PRIMARY_THEME_COLOR,
  BLACK_COLOR,
} from "../utilities/constant";

const styles = StyleSheet.create({
    inputView: {
    fontSize: normalize(16),
    paddingLeft: normalizeSpacing(Isios ? 5 : 15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    borderColor: PRIMARY_THEME_COLOR,
    borderRadius: normalize(10),
    backgroundColor: WHITE_COLOR,
    // margin: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(10),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,
  },
  searchIconTouch: {
    padding: normalizeSpacing(10),
  },
  searchIconImg: {
    height: normalizeHeight(20),
    width: normalizeWidth(30),
  },
  TextInput:{
    width: '85%',
    height: normalizeHeight(40),
    textAlignVertical: 'top',
    color: BLACK_COLOR,
    fontSize: 12,
    fontFamily: FONT_FAMILY_SEMIBOLD
  }
});

export default styles;
