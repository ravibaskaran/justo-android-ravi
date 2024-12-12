import { StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from '../../../../components/scaleFontSize';
import { BG_MAIN_COLOUR, BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_MEDIUM, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR, WHITE_COLOR_LIGHT } from '../../../../components/utilities/constant';

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
    topScreensVw: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: normalize(6)
    },
    topItemsVw: {
        backgroundColor: PRIMARY_THEME_COLOR,
        borderRadius: 100,
        width: normalizeWidth(20),
        height: normalizeHeight(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    borders: {
        height: normalizeHeight(2),
        width: normalizeWidth(90),
    },
    topTxts: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY_MEDIUM,
        color: WHITE_COLOR
    },
    noMoveVw: {
        backgroundColor: WHITE_COLOR,
        paddingVertical: normalize(10)
    },
    wrap: {
        flexGrow: 1,
        paddingHorizontal: normalize(20),
        bottom: normalize(10)
    },
    typeVw: {
        marginVertical: normalize(10),
        marginTop: normalize(20),
    },
    typeTxt: {
        fontSize: normalize(18),
        color: PRIMARY_THEME_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD,
    },
    typeBorders: {
        height: normalizeHeight(2),
        width: normalizeWidth(50),
        backgroundColor: BG_MAIN_COLOUR,
        marginTop: 3,
        marginLeft: 3
    },
    inputWrap: {
        marginTop: normalizeSpacing(30),
    },
    inputContVw: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    smallContVw: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallBox: {
        backgroundColor: WHITE_COLOR,
        width: '15%',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        marginHorizontal: normalize(5),
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    budgetInput: {
        backgroundColor: WHITE_COLOR,
        height: normalizeHeight(50),
        width: '55%',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        borderColor: GRAY_COLOR,
        color: BLACK_COLOR,
        paddingLeft: normalizeSpacing(8),
        fontSize: 15
    },
    smallCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: normalizeSpacing(6),
        marginTop: normalize(14),
    },
    headingsTxt: {
        fontSize: normalize(16),
        color: PRIMARY_THEME_COLOR,
        marginBottom: normalize(8),
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    selectsView: {
        marginTop: normalize(14),
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectsTxt: {
        fontSize: normalize(18),
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    straightVw: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: normalize(8),
        marginRight: normalize(10)
    },
    radioView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioTxt: {
        fontSize: normalize(18),
    },
    workingView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: normalizeSpacing(10)
    },
    addBtn: {
        backgroundColor: PRIMARY_THEME_COLOR,
        width: normalizeWidth(140),
        height: normalizeHeight(25),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addTxt: {
        color: WHITE_COLOR,
        textTransform: 'uppercase',
        fontSize: normalize(13),
        fontFamily: FONT_FAMILY_EXTRABOLD
    },
    workTxt: {
        color: BLACK_COLOR,
        textTransform: 'uppercase',
        fontSize: normalize(13),
        fontFamily: FONT_FAMILY_EXTRABOLD
    },
    btnView: {
        marginBottom: normalizeSpacing(20),
    },
    checkBoxVw: {
        backgroundColor: WHITE_COLOR,
        padding: normalizeSpacing(3),
        borderWidth: 0.5,
        borderRadius: normalize(5)
    },
    checkTxt: {
        fontSize: normalize(13.5),
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
    },
    checksVw: {
        width: normalizeWidth(5),
        height: normalizeHeight(10),
        marginHorizontal: 5,
    },
    radioBtnView: {
        width: '100%',
        marginVertical: normalizeSpacing(20),
        marginLeft: normalizeSpacing(10)
    },
    tickImgVw: {
        backgroundColor: PRIMARY_THEME_COLOR,
        borderRadius: normalize(50),
        marginRight: normalize(15),
        padding: normalize(2),
      },
      tickImg: {
        height: normalizeHeight(18),
        width: normalizeWidth(18),
        tintColor: WHITE_COLOR,
      },
      genderView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: normalizeSpacing(10),
        width: "100%",
      }
})
export default styles