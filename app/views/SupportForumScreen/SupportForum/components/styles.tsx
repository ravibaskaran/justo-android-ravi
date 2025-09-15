import { normalizeSpacing, normalize, normalizeWidth, normalizeHeight } from '../../../../components/scaleFontSize';
import { FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    RightFirstIconStyle: {
        tintColor: WHITE_COLOR,
    },
    mainView: {
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
        marginVertical: normalizeSpacing(10),
    },
    reportTxt: {
        fontSize: normalize(20),
        fontFamily: FONT_FAMILY_EXTRABOLD
    },
    dateTxt: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        alignSelf: 'flex-end',
        marginTop: normalizeSpacing(5)
    },
    demoImgView: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    Img: {
        width: normalizeWidth(100),
        height: normalizeHeight(100),
        borderRadius: normalize(8),
        marginLeft: normalizeSpacing(10)
    },
    btnView: {
        top: 10,
        backgroundColor: PRIMARY_THEME_COLOR,
        borderBottomEndRadius: 10,
        borderTopLeftRadius: 10,
        // padding: normalizeSpacing(5)
    },
    downloadImg: {
        width: normalizeWidth(40),
        height: normalizeHeight(40),
        tintColor: WHITE_COLOR
    },
    shareImg: {
        width: normalizeWidth(30),
        height: normalizeHeight(30),
        marginLeft: normalizeSpacing(10)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: normalizeSpacing(10),
        alignItems: 'center'
    },
    button: {
        top: 10,
        backgroundColor: WHITE_COLOR,
        width: normalizeWidth(100),
        height: normalizeHeight(30),
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10
    },
    buttonTxt: {
        textAlign: 'center'
    },
})
export default styles