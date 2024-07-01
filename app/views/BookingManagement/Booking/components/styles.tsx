import { StyleSheet } from 'react-native';
import { normalize, normalizeSpacing } from '../../../../components/scaleFontSize';
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
    containerVw: {
        marginHorizontal: normalize(16),
        marginTop: normalizeSpacing(30),
    },
    inputWrap: {
        marginTop: normalizeSpacing(25),
    },
    straightVw: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: normalize(10)
    },
    titleTxt: {
        fontSize: normalize(17),
        fontFamily: FONT_FAMILY_REGULAR,
        color: GRAY_LIGHT_COLOR
    },
    button : {
        // width: normalizeWidth(120),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: normalizeSpacing(12),
      },
      topBtnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20
      },
      buttonTxt : {
        textAlign: 'center',
        fontSize: normalize(14),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: PRIMARY_THEME_COLOR
      },
      IteamView: {
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      Txtview : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      projectContainer : {
        flex: 3,
        alignItems: 'flex-start',
        height: '100%',
        marginLeft:normalizeSpacing(15)
      },
      projectTxt : {
        fontSize: normalize(17),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR
      },
      nameContainer : {
        flex: 3,
        alignItems: 'flex-start',
      },
    nameTxt : {
        fontSize: normalize(17),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        marginHorizontal: normalizeSpacing(10)
      },
})
export default styles