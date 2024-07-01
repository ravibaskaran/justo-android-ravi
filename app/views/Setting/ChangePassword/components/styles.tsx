import { StyleSheet } from "react-native";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

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
      }
});

export default styles;