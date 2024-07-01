import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_EXTRABOLD,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "../utilities/constant";

const styles = StyleSheet.create({
  fullContainer: {
    marginLeft: 0,
    width: "100%",
    marginBottom: 0,
  },
  mainContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 5,
  },
  propMainContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 10,
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
  redStar:{color: 'red', fontSize: normalize(18)},
  descTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
    marginTop: normalizeSpacing(10),
  },
  borderView: {
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
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
  bottomTxt: {
    color: BLACK_COLOR,
    fontSize: normalize(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
  },
  MiddleContainer: {
    marginVertical: normalizeSpacing(10),
    padding: 3.5,
  },
  closeIcon: {
    tintColor: "red",
    width: normalizeWidth(30),
    height: normalizeHeight(30),
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  titleTxt: {
    fontSize: normalize(16),
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
    marginLeft: 5,
    marginVertical: normalize(8),
  },
  errorTxt: {
    color: RED_COLOR,
    marginLeft: normalizeSpacing(10),
    marginVertical: normalize(6),
  },
  inputWrap: {
    marginTop: normalizeSpacing(16),
  },
  btnview: {
    width: "50%",
    height: normalizeHeight(50),
  },
  conteconfirm: {
    flexDirection: "column",
  },
  cancelModalVw: {
    position: "absolute",
    alignSelf: "center",
    top: -30,
    backgroundColor: PRIMARY_THEME_COLOR,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(5),
  },
  pickerModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  pickerModalCon: {
    backgroundColor: PRIMARY_THEME_COLOR,
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: normalize(20),
  },
  straightVw: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  componentsVw: {
    paddingVertical: normalize(5),
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    alignItems: "center",
    marginHorizontal: normalize(10),
    borderRadius: 10,
    width: normalizeWidth(70),
  },
  componentsImg: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    tintColor: WHITE_COLOR,
  },
  componentsTxt: {
    fontSize: normalize(14),
    color: WHITE_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  selecttxtmodel: {
    marginVertical: normalizeSpacing(10),
    fontFamily: FONT_FAMILY_EXTRABOLD,
    fontSize: 18,
  },
  citySearchView: {
    backgroundColor: WHITE_COLOR,
    marginHorizontal: normalizeSpacing(10),
    borderRadius: 5,
    marginVertical: normalizeSpacing(10),
    borderColor: PRIMARY_THEME_COLOR,
    borderWidth: 1,
  },
  cityListView: {
    height: normalizeHeight(250),
    backgroundColor: WHITE_COLOR,
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(20),
    shadowColor: "#000",
    elevation: 10,
  },
  genderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: normalizeSpacing(10),
    marginTop: 30,
    width: "100%",
  },
  genderTxt: {
    fontSize: normalize(18),
    color: PRIMARY_THEME_COLOR,
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: normalizeSpacing(10),
  },
  radioTxt: {
    fontSize: normalize(18),
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  headerTextStyle: {
    color: WHITE_COLOR,
  },
  containerVw: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(12),
    backgroundColor: WHITE_COLOR,
  },
  headerTxt: {
    fontSize: normalize(16),
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  selectedBox: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
    borderWidth: 1,
    borderColor: PRIMARY_THEME_COLOR,
    marginVertical: normalize(8),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderRadius: normalize(10),
  },
  innerBoxVw: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 5,
    //paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 2,
    minWidth: 50,
    justifyContent: "space-between",
    //backgroundColor:'red',
    //borderRadius:3,
    borderWidth: 1,
    borderColor: GRAY_COLOR,
  },
  userNameTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    maxWidth: '90%'
  },
  crossVw: {
    width: normalizeWidth(15),
    height: normalizeHeight(15),
    marginHorizontal: 5,
  },
  noSelectedTxt: {
    fontSize: normalize(14),
    color: GRAY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    paddingHorizontal: 8,
  },
  searchInputVw: {
    marginVertical: 2,
    height: 40,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 14,
    color: BLACK_COLOR,
    backgroundColor: WHITE_COLOR,
    elevation: 1,
    paddingLeft: 20,
    borderRadius: 10,
  },
  innerBoxVwlist: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: normalize(12),
    marginVertical: normalize(10),
    minWidth: normalizeWidth(70),
    justifyContent: "space-between",
  },
  innerBoxVwlistfont: {
    fontSize: 15,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    width: "90%",
  },
  checkBoxVw: {
    backgroundColor: WHITE_COLOR,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 2,
  },
  checksVw: {
    width: normalizeWidth(5),
    height: normalizeHeight(10),
    marginHorizontal: 5,
  },
  btncontener: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: normalizeSpacing(10),
    marginVertical: normalizeSpacing(8),
  },
  inventoryWrap: {
    margin: 10,
    marginLeft: 20,
  },
  inventoryView: {
    padding: 5,
  },
  inventoryTxt: {
    fontSize: normalize(14),
    fontFamily: FONT_FAMILY_REGULAR,
  },
  countyModelCon: {
    height: Isios ? "90%": '90%',
    backgroundColor: "#f5f2f2",
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 10,
    marginVertical: 20
  },
  searchInputCon: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#a9a9a9",
    marginBottom: 10,
    height: 40,
    // justifyContent: "center",
  },
  serchInput: {
    color: "#000",
    fontFamily: FONT_FAMILY_REGULAR,
    paddingBottom: 5,
    paddingLeft: 15,
    textAlignVertical: 'center'
  },
  countryCodeSelect: {
    height: 35,
    flexDirection: "row",
    paddingLeft: 15,
    alignItems: "center",
    borderTopWidth: 0.4,
    borderTopColor: "#a9a9a9",
    marginBottom: 2
  },
  countrycloseIcon: {
    tintColor: "red",
    width: normalizeWidth(35),
    height: normalizeHeight(35),
  },
});

export default styles;
