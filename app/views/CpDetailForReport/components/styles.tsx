import { StyleSheet } from "react-native";
import { normalize, normalizeSpacing } from "../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR
} from "../../../components/utilities/constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: WHITE_COLOR,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
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
    flex: 2.5,
    alignItems: "flex-end",
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR,
  },
  nameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10),
  },
  nameContainer: {
    flex: 3.5,
    alignItems: "flex-start",
  },
  smnameView: {
    padding: normalize(10),
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: normalizeSpacing(10),
    marginTop: normalizeSpacing(10)
  },
  headingView: {
    flexDirection: "row",
    marginVertical: normalizeSpacing(2),
    borderBottomColor: PRIMARY_THEME_COLOR,
    borderBottomWidth: 3,
    alignItems: "center",
  },
  headingText: {
    // flex: 1,
    // padding: normalizeSpacing(5),
    color: PRIMARY_THEME_COLOR,
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    // textAlign: "center",
  },
  dataView: {
    flexDirection: "row",
  },
  dataTxt: {
    // flex: 1,
    padding: normalizeSpacing(5),
    color: BLACK_COLOR,
    fontSize: normalize(13),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
  },
  listView: {
    flex: 1,
  },
  heddingBox: {
    flex: 2,
    alignItems: 'center'
  },
  dataBox: {
    flex: 2,
    alignItems: 'center',
    marginVertical: normalizeSpacing(5),
    borderBottomColor: PRIMARY_THEME_COLOR,
    borderBottomWidth: 0.5,
  },
  searchInputVw: {
    marginVertical: normalizeSpacing(8),
    marginHorizontal: normalizeSpacing(8),
    height: 40,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 14,
    color: BLACK_COLOR,
    backgroundColor: WHITE_COLOR,
    elevation: 1,
    paddingLeft: 20,
    borderRadius: 10,
  },
  noSelectedTxt: {
    fontSize: normalize(14),
    color: GRAY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    paddingHorizontal: 8,
    textAlign: "center",
    marginTop: 20
  },
});

export default styles;
