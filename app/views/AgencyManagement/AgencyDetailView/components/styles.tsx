import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from '../../../../components/utilities/constant';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  leftImageIconStyle: {
    tintColor: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1,
  },
  propertyListView: {
    flex: 1,
//marginTop: normalizeSpacing(2),
  },
  IteamView: {
    backgroundColor: WHITE_COLOR,
    padding: normalizeSpacing(10),
    borderRadius: 10,
    marginVertical: normalizeSpacing(10),
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
    height:'100%',
    marginLeft:normalizeSpacing(15),
  },
  projectTxt: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_LIGHT_COLOR
  },
  headingTxt: {
    fontSize: normalize(20),
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  headingView: {
    padding: normalizeSpacing(10),
    alignItems: 'center'
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalizeSpacing(10),
    marginHorizontal: normalizeSpacing(10),
  },
  button: {
    backgroundColor: WHITE_COLOR,
    width: normalizeWidth(90),
    height: normalizeHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5
  },
  buttonTxt: {
    // color: WHITE_COLOR,
    // textAlign: 'center'
  },
  closeIconTouch:{
    position: 'relative'
  },
  closeIcon: {
    tintColor: "red",
    width: normalizeWidth(30),
    height: normalizeHeight(30),
  },
  linkTouch:{

  }
});

export default styles;
