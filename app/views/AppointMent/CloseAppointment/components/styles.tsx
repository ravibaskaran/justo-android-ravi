import { normalize } from "@rneui/themed";
import { normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_MEDIUM, GRAY_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    RightFirstIconStyle: {
        tintColor: WHITE_COLOR,
      },
      mainContainer: {
        borderRadius: 5,
      },
      headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
      },
      topContainer: {
        flexDirection: "row",
        marginVertical: normalizeSpacing(10),
        justifyContent: "space-between",
        marginHorizontal: normalizeSpacing(10),
      },
      topTxt: {
        color: BLACK_COLOR,
        fontSize: normalize(18),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        width: "92%",
      },
      closeIcon: {
        tintColor: "red",
        width: normalizeWidth(30),
        height: normalizeHeight(30),
      },
      borderView: {
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 1,
      },
      titleTxt: {
        fontSize: normalize(16),
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        marginLeft: 5,
        marginVertical: normalize(8),
      },
    inputWrap: {
        marginTop: normalizeSpacing(16),
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
      },
      errorTxt: {
        color: RED_COLOR,
        marginLeft: normalizeSpacing(10),
        marginVertical: normalize(6),
      },
      propertyVw: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      },
      addNewBttn: {
        alignSelf: "flex-end",
        marginBottom: normalizeSpacing(6),
      },
});


export default styles;
