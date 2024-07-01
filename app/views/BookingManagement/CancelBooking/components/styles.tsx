import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from 'app/components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant';
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
    listView: {
        flex: 1,
        margin: normalizeSpacing(10),
    },
    IteamView: {
        backgroundColor: WHITE_COLOR,
        marginHorizontal: normalizeSpacing(10),
        borderRadius: 10,
        marginVertical: normalizeSpacing(10),
    },
    Txtview: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 1,
        padding: normalizeSpacing(4),
        marginTop: normalizeSpacing(2),
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: normalizeSpacing(10),
        alignItems: 'flex-end'
    },
    Viewbutton: {
        top: 10,
        backgroundColor: PRIMARY_THEME_COLOR,
        borderBottomEndRadius: 10,
        borderTopLeftRadius: 10,
        padding: normalizeSpacing(5)
    },
    arrow: {
        tintColor: WHITE_COLOR,
        width: normalizeWidth(30),
        height: normalizeHeight(30)
    },
})
export default styles