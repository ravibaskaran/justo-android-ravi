import { StyleSheet } from 'react-native';
import { normalize, normalizeSpacing } from '../../../../components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    headerTextStyle: {
        color: WHITE_COLOR,
    },
    topItemsVw: {
        flex: 0.9,
        paddingHorizontal: normalize(18),
        paddingVertical: normalize(10),
        justifyContent: 'center'
    },
    IteamView: {
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderBottomWidth: 0.6,
        paddingHorizontal: normalize(10),
        borderColor: GRAY_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(8)
    },
    headTxt: {
        fontFamily: FONT_FAMILY_EXTRABOLD,
        fontSize: normalizeSpacing(20),
        color: BLACK_COLOR,
        textAlign: 'center',
        marginVertical: normalizeSpacing(10),
        textTransform: 'capitalize',
    },
    Txtview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(12),
        justifyContent: 'space-between',
    },
    projectTxt: {
        fontSize: normalize(18),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR
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
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: normalize(15),
        textTransform: 'capitalize',
    },
    Viewbutton: {
        backgroundColor: PRIMARY_THEME_COLOR,
        borderBottomEndRadius: 10,
        borderTopLeftRadius: 10,

    },
})
export default styles