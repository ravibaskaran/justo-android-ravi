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
    // flex: 1,
    marginTop: normalizeSpacing(2),
  },
  leadDetailsItemView: {
    flex: 1,
    marginVertical: normalizeSpacing(0),
    backgroundColor:WHITE_COLOR
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
    fontSize:normalize(18),
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
    marginLeft:normalizeSpacing(15)
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
  headdingView: {
    marginVertical: normalizeSpacing(25),
    alignItems: 'center',
    
  },
  headdingTxt: {
    fontSize: normalize(18),
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(10)
  }
})

export default styles