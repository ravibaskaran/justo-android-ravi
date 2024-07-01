import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../scaleFontSize';
import { BLACK_COLOR, BLUE_COLOR, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, GRAY_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, PURPLE_COLOR, WHITE_COLOR } from '../utilities/constant';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: WHITE_COLOR
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    headerTextStyle: {
        color: WHITE_COLOR,
    },
    containerVw: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        paddingVertical: normalize(10)
    },
    headerTxt: {
        fontSize: normalize(16),
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        marginTop: normalize(12)
    },
    selectedBox: {
        paddingVertical: normalize(5),
        borderWidth: 1,
        borderColor: GRAY_COLOR,
        marginVertical: normalize(8),
        borderRadius: normalize(10),
        paddingHorizontal: normalize(8),
        minHeight: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSelectedTxt: {
        fontSize: normalize(15),
        color: GRAY_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        paddingHorizontal: 8,
    },
    innerBoxVw: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(5),
        marginVertical: normalize(5),
        borderRadius: normalize(8),
        borderColor: PRIMARY_THEME_COLOR_DARK,
    },
    innerBoxTxt: {
        fontSize: normalize(13),
        color: PRIMARY_THEME_COLOR_DARK,
        fontFamily: FONT_FAMILY_MEDIUM,
        width: '90%'
    },
    innerBoxVwlist: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: normalize(12),
        marginVertical: normalize(10),
        minWidth: normalizeWidth(70),
        justifyContent: 'space-between',
    },
    innerCont: {
        paddingBottom: normalize(10),
        paddingHorizontal: normalize(16),
        backgroundColor: WHITE_COLOR
    },
    innerBoxVwlistfont: {
        fontSize: 15
    },
    crossVw: {
        width: normalizeWidth(18),
        height: normalizeHeight(18),
        marginHorizontal: 5,
        tintColor: PRIMARY_THEME_COLOR_DARK
    },
    checkBoxVw: {
        backgroundColor: WHITE_COLOR,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 2
    },
    checksVw: {
        width: normalizeWidth(5),
        height: normalizeHeight(10),
        marginHorizontal: 5,
    },
    searchTxt: {
        fontSize: normalize(14),
        marginVertical: normalize(8),
        marginLeft: normalize(5),
        color: PRIMARY_THEME_COLOR_DARK,
        marginTop: normalize(15)
    }
})
export default styles