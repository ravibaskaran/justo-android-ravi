import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

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
    backgroundColor: WHITE_COLOR
  },
  topDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalizeSpacing(10),
    marginBottom: normalizeSpacing(10),
    alignItems: 'center'
  },
  topTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(10),
    justifyContent: 'flex-end',
    marginHorizontal: normalize(20)
  },
  topTxt: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_EXTRABOLD,
    fontSize: normalize(18),
  },
  qrView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrImg: {
    width: normalizeWidth(80),
    height: normalizeHeight(80)
  },
  Txtview: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: normalizeSpacing(10),
  },
  projectContainer: {
    flex: 2.5,
    alignItems: 'flex-start',
    height: '100%',
    marginLeft: normalizeSpacing(15)
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR
  },
  nameContainer: {
    flex: 3.5,
    alignItems: 'flex-start',
  },
  nameTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    marginHorizontal: normalizeSpacing(10)
  },
  bntView: {
    marginVertical: normalizeSpacing(10)
  }
})

export default styles