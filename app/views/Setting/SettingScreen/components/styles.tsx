import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR, GRAY_LIGHT_COLOR } from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
    },
    leftImageIconStyle: {
        tintColor: WHITE_COLOR,
    },
    listView: {
        flex: 1,
        //margin: normalizeSpacing(10)
    },
    listItemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems :'center',
        padding: normalizeSpacing(15),
        borderBottomColor:GRAY_LIGHT_COLOR,
        borderBottomWidth:0.5,
    },
    iconView:{
        flex: 1,
    },
    listIconStyle: {
        height: normalizeHeight(30),
        width: normalizeWidth(30),
        tintColor: PRIMARY_THEME_COLOR,
    },
    headingView: {
        flex: 4,
    },
    headingTxt: {
        fontSize: normalize(16),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR
    },
    rightArrowView: {
        flex: 1,
        justifyContent :'center',
        alignItems: 'center',
        
    },
    rightArrowImage:{
        height: normalizeHeight(20),
        width: normalizeWidth(20),
    },
});

export default styles;