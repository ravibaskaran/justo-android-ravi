import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR, } from '../../../../components/utilities/constant';

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
    topItemsVw: {
        paddingHorizontal: normalize(18),
        paddingVertical: normalize(10),
        justifyContent: 'center',
        height: normalizeHeight(190),
    },
    IteamView: {
        backgroundColor: WHITE_COLOR,
        marginVertical: normalizeSpacing(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: normalize(18),
    },
    Txtview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(12),
        justifyContent: 'space-between',
        paddingVertical: normalize(8),
    },
    projectTxt: {
        fontSize: normalize(18),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        textTransform: 'capitalize',
    },
    columnVw: {
        paddingRight: normalize(20),
        paddingVertical: normalize(5)
    },
    nameTxt: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY_MEDIUM,
        color: GRAY_LIGHT_COLOR,
    },
    txtStyle: {
        color: PRIMARY_THEME_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: normalize(15),
        marginLeft: normalize(3)
    },
    Viewbutton: {
        backgroundColor: PRIMARY_THEME_COLOR,
        borderBottomEndRadius: normalize(10),
        borderTopLeftRadius: normalize(10),
        marginRight: normalize(10)
    },
    arrow: {
        tintColor: WHITE_COLOR,
        width: normalizeWidth(36),
        height: normalizeHeight(36),
    },
})
export default styles