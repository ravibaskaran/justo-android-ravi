import { Platform, StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../components/utilities/constant";

const styles = StyleSheet.create({
  drawerMain: {
    flex: 1,
    backgroundColor: PRIMARY_THEME_COLOR
  },
  MainContainer: {
    padding: normalizeSpacing(15),
    backgroundColor: PRIMARY_THEME_COLOR,
    borderBottomWidth: 0.5,
    borderColor: WHITE_COLOR,
  },
  ContainerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  NameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImageView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  UserImge: {
    width: normalizeWidth(60),
    height: normalizeHeight(60),
    borderRadius: 40,
  },
  UserNameView: {
    paddingLeft: 10,
  },
  UserNameText: {
    fontSize: 20,
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_EXTRABOLD
  },
  UserAddress: {
    fontSize: 13,
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  drawerTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: WHITE_COLOR,
    padding: normalizeSpacing(10),
  },
  drawerIconStyle: {
    height: normalizeHeight(25),
    width: normalizeWidth(25),
    tintColor: WHITE_COLOR
  },
  drawerText: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: WHITE_COLOR,
    marginLeft: normalizeSpacing(10),
  },
  versionView: {
    alignContent: 'flex-end',
    borderTopWidth: 0.5,
    borderColor: WHITE_COLOR,
  },
  closeDrawerView: {
    position: 'absolute',
    left: '115%',
    backgroundColor: PRIMARY_THEME_COLOR,
    borderRadius: 20,
  },
  closeDrawerImage: {
    tintColor: WHITE_COLOR,
    height: normalizeHeight(25),
    width: normalizeWidth(25),
    padding: 20
  },
  badget: {
    borderWidth: 0,
    alignItems: 'center',
  }
});

export default styles;