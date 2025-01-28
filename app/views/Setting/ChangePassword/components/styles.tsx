import { StyleSheet } from "react-native";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { FONT_FAMILY_SEMIBOLD, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import { normalize } from "@rneui/themed";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headerStyle: {
        backgroundColor: PRIMARY_THEME_COLOR,
      },
      leftImageIconStyle: {
        tintColor: WHITE_COLOR,
      },
      inputWrap: {
        marginTop: normalizeSpacing(30),
      },
      wrap: {
        flex: 1,
        margin: normalizeSpacing(20),
        alignItems: 'center',
      },
      btnView:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      forgotText: {
        fontSize: normalize(15),
        fontWeight: '600',
        marginTop:normalizeSpacing(20),
        color: PRIMARY_THEME_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD,
      }
});

export default styles;