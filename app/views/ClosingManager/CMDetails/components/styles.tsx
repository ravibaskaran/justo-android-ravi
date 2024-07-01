import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE_COLOR
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  topItemVw: {
    alignItems: 'center',
    marginVertical: normalizeSpacing(10),
    marginRight: normalizeSpacing(10),
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  topItemSty: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    resizeMode: 'contain',
    marginHorizontal: 5
  },
  propertyListView: {
    flex: 1,
    marginTop: normalizeSpacing(2),
  },
  Txtview: {
    flexDirection: 'row',
    borderColor: GRAY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: normalizeSpacing(10),
  },
  projectContainer: {
    flex: 2.5,
    alignItems: 'flex-start',
    height: '100%',
    marginLeft: normalizeSpacing(15),
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
  allocatsVw: {
    marginLeft: 15,
    borderBottomWidth: 0,
  },
  allocatsBox: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: PRIMARY_THEME_COLOR,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    paddingHorizontal: 8
  },
  noSelectedTxt: {
    fontSize: normalize(14),
    color: GRAY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    paddingHorizontal: 8
  },
  innerBoxVw: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 5,
    minWidth: 90,
    elevation: 1.5,
    backgroundColor: WHITE_COLOR,
    justifyContent: 'space-between',
  },
  crossVw: {
    width: normalizeWidth(22),
    height: normalizeHeight(22),
    marginHorizontal: 5
  },
  bigTitlesTxt: {
    fontFamily: FONT_FAMILY_EXTRABOLD,
    color: BLACK_COLOR,
    fontSize: normalize(18),
    alignSelf: 'center',
    marginVertical: 5,
  },

  button: {
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(50),
    height: normalizeHeight(25),
    marginLeft: normalizeSpacing(20),
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 10
  },
  buttonTxt: {
    color: BLACK_COLOR,
    textAlign: 'center'
  },
})
export default styles