import { StyleSheet } from 'react-native';
import { normalize, normalizeSpacing } from '../../../../components/scaleFontSize';
import { BG_MAIN_COLOUR, BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';

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
    topItemsVw: {
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(16)
    },
    inputWrap: {
        marginVertical: normalizeSpacing(8),
    },
    listView: {
        flex: 1,
        marginHorizontal: normalizeSpacing(10),
    },
    IteamView: {
        backgroundColor: BG_MAIN_COLOUR,
        borderRadius: 10,
        marginVertical: normalizeSpacing(5),
    },
    Txtview: {
        flexDirection: 'row',
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 0.4,
        padding: normalizeSpacing(4),
        marginTop: normalizeSpacing(2),
        paddingVertical: normalize(9),
    },
    projectContainer: {
        flex: 2.5,
        alignItems: 'flex-end',
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
})
export default styles