import { normalizeSpacing, normalize, normalizeWidth, normalizeHeight } from "app/components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  topDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalizeSpacing(10),
    marginBottom: normalizeSpacing(10),
    marginTop: normalizeSpacing(10),
  },
  topTxtView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topTxt: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_EXTRABOLD,
    fontSize: normalize(18),
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: normalizeSpacing(10)
  },
  Img: {
    width: normalizeWidth(100),
    height: normalizeHeight(100),
    borderRadius: normalize(8)
  },
  replyView: {
    backgroundColor: WHITE_COLOR,
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(10),
    borderRadius: normalize(10)
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalizeSpacing(10),
    alignItems: 'flex-end'
  },
})

export default styles