import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from 'app/components/scaleFontSize'
import {
    BLACK_COLOR,
    FONT_FAMILY_EXTRABOLD, FONT_FAMILY_REGULAR, BG_MAIN_COLOUR, PRIMARY_THEME_COLOR, WHITE_COLOR, WHITE_COLOR_LIGHT
} from 'app/components/utilities/constant'
import { StyleSheet } from 'react-native'

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
    mainCon: {
        paddingHorizontal: normalizeSpacing(16),
        paddingVertical: normalizeSpacing(12),
        marginTop: normalizeSpacing(20)
    },
    titleTxt: {
        fontSize: normalize(18),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        textTransform: 'capitalize'
    },
    descriptnTxt: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_REGULAR,
        color: BLACK_COLOR,
        marginTop: normalizeSpacing(12),
    },
    locationVw: {
        backgroundColor: BG_MAIN_COLOUR,
        paddingVertical: normalizeSpacing(12),
        paddingHorizontal: normalizeSpacing(5),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: normalize(8),
        marginVertical: normalize(16),
        elevation: 1
    },
    locationImg: {
        width: normalize(20),
        height: normalize(20),
        tintColor: PRIMARY_THEME_COLOR,
    },
    locationTxt: {
        fontSize: normalize(14),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        marginLeft: normalizeSpacing(10)
    },
    demoImgView: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
    },
    Img: {
        width: normalizeWidth(100),
        height: normalizeHeight(100),
        borderRadius: normalize(8)
    },
    contentVw: {
        width: '100%',
        position: 'absolute',
        height: '100%',
        backgroundColor: WHITE_COLOR
    },
    contentImgs: {
        width: '90%',
        height: '90%',
    },
    playbtntch: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    shareTouch:{
        padding: 10
    }
})

export default styles