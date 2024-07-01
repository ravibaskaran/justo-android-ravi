import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, Isios, PRIMARY_THEME_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant';

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
    detailsItemView: {
        flex: 1,
        //marginVertical: normalizeSpacing(10),
        backgroundColor: WHITE_COLOR
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginHorizontal: normalizeSpacing(10),
        // marginVertical: normalizeSpacing(5),
        // flexWrap: 'wrap',
    },
    buttonVw: {
        marginVertical: normalize(8)
    },
    documentVw: {
        margin: normalizeSpacing(5),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: normalizeSpacing(16),
    },
    documentTxt: {
        fontSize: normalize(14),
        color: PRIMARY_THEME_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD,
    },
    documentIcon: {
        width: normalizeWidth(18),
        height: normalizeHeight(18),
        marginLeft: normalizeSpacing(10),
    },
    topDetailsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: normalizeSpacing(10),
        marginBottom: normalizeSpacing(10),
        marginTop: normalizeSpacing(10)
    },
    topTxtView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBtnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    topTxt: {
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_EXTRABOLD
    },
    button: {
        backgroundColor: WHITE_COLOR,
        width: normalizeWidth(50),
        height: normalizeHeight(25),
        marginLeft: normalizeSpacing(10),
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 10
    },
    buttonTxt: {
        color: BLACK_COLOR,
        textAlign: 'center'
    },
    Txtview: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 1,
        paddingVertical: normalizeSpacing(10),
    },
    projectContainer: {
        flex: 2.5,
        alignItems: 'flex-start',
        height: '100%',
        marginLeft: normalizeSpacing(15),
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
    headdingView: {
        marginVertical: normalizeSpacing(10),
        alignItems: 'center'
    },
    headdingTxt: {
        fontSize: normalize(18),
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: GRAY_LIGHT_COLOR
    },
    bookingModelVw: {
        backgroundColor: WHITE_COLOR,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: normalizeSpacing(24)
    },
    inputHeadingText: {
        fontSize: normalize(Isios ? 14 : 16),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: PRIMARY_THEME_COLOR,
        marginLeft: normalizeSpacing(14)
    },
    straightVw: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: normalize(24)
    },
    imageVw: {
        width: normalizeWidth(60),
        height: normalizeHeight(60),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: normalize(10),
    },
    docsVwSty: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: normalizeSpacing(16),
        bottom: normalizeSpacing(6),
    },
    docsVw: {
        marginHorizontal: normalizeSpacing(6)
    }
})
export default styles;