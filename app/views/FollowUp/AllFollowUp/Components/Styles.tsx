import { StyleSheet } from "react-native";
import { normalizeSpacing, normalize } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    RightFirstIconStyle: {
        tintColor: WHITE_COLOR,
    },
    mainConatiner: {
        flex: 1
    },
    iteamView: {
        flex: 1,
    },
    Txtview: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 1,
        paddingVertical: normalizeSpacing(10),
    },
    Txtviewlast: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: normalizeSpacing(10),
    },
    projectContainer: {
        flex: 2,
        alignItems: 'flex-start',
        height: '100%',
        marginLeft:normalizeSpacing(15)
    },
    projectTxt: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR
    },
    nameContainer: {
        flex: 4,
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