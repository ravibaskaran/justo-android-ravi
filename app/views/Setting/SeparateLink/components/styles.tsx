import { StyleSheet } from "react-native";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import { FONT_FAMILY_SEMIBOLD, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

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
      warp:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      qrcodeImage: {
        height: normalizeHeight(300),
        width: normalizeWidth(300)
      },
      btnCopyLinkView: {
        flex: 1,
      },
      notFoundText :{
        fontSize: normalize(15),
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_LIGHT_COLOR
      }
});

export default styles;