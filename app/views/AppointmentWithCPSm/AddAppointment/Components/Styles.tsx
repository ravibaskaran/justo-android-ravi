import { StyleSheet } from "react-native";
import { normalizeSpacing, normalize } from "../../../../components/scaleFontSize";
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  mainContainer: {
    flex: 1
  },
  AddAppointmentView: {
    flex: 1
  },
  wrap: {
    flex: 1,
    margin: normalizeSpacing(10),
    alignItems: 'center',
  },
  headingText: {
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: PRIMARY_THEME_COLOR,
    textAlign: 'center'
  },
  inputWrap: {
    marginTop: normalizeSpacing(30),
    width: '100%'
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
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
  placeholderStyle: {
    fontSize: 16,
    color: GRAY_LIGHT_COLOR
  },
  selectedTextStyle: {
    fontSize: 16,
    color: GRAY_LIGHT_COLOR
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  genderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: normalizeSpacing(10),
    width: '100%'
  },
  genderTxt: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: normalizeSpacing(10)
  },
  radioTxt : {
    fontSize: normalize(18),
  },
  btnView: {
    marginVertical: normalizeSpacing(20)
  },
  headingsTxt: {
    fontSize: normalize(16),
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_SEMIBOLD,
  }
})

export default styles