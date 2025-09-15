import { normalize } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_EXTRABOLD, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: RED_COLOR
      },
      headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
      },
      RightFirstIconStyle: {
        tintColor: WHITE_COLOR,
      },
      IteamView: {
        backgroundColor: WHITE_COLOR,
        marginHorizontal: normalizeSpacing(10),
        borderRadius: 10,
        marginVertical: normalizeSpacing(10),
      },
      Txtview: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: 1,
        padding: normalizeSpacing(4),
        marginTop: normalizeSpacing(2),
      },
      projectContainer: {
        flex: 3.5,
        alignItems: "flex-end",
      },
      projectTxt: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR,
      },
      nameContainer: {
        flex: 3.5,
        alignItems: "flex-start",
      },
      nameTxt: {
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_EXTRABOLD,
        color: BLACK_COLOR,
        marginHorizontal: normalizeSpacing(10),
      },
      listView: {
        flex: 1,
        margin: normalizeSpacing(10),
      },
});

export default styles;
