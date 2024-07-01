import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../../../../components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR, WHITE_COLOR_LIGHT } from '../../../../components/utilities/constant';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    headerTextStyle: {
        color: WHITE_COLOR,
    },
    containerVw: {
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    headerTxt: {
        fontSize: normalize(16),
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM
    },
    selectedBox: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: PRIMARY_THEME_COLOR,
        marginVertical: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
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
        minWidth: 100,
        justifyContent: 'space-between'
    },
    searchInputVw: {
        marginVertical: 2,
        height: 40,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontSize: normalize(14),
        color: BLACK_COLOR,
        backgroundColor: WHITE_COLOR,
        elevation: 1,
        paddingLeft: 20
    },
    crossVw: {
        width: normalizeWidth(22),
        height: normalizeHeight(22),
        marginHorizontal: 5
    },
    checkBoxVw: {
        backgroundColor: GRAY_COLOR,
        paddingVertical: 2,
        borderWidth: 1
    },
    checksVw: {
        width: normalizeWidth(5),
        height: normalizeHeight(10),
        marginHorizontal: 5,
    }
})
export default styles