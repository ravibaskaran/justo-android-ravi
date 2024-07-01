import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  Regexs,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import {
  addAgent,
  addAgentRemove,
  editAgent,
} from "app/Redux/Actions/AgentActions";
import ErrorMessage from "app/components/ErrorMessage";
import { normalize } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import CheckBox from "@react-native-community/checkbox";
import { RadioButton } from "react-native-paper";

const AgentBankInfo = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const { response = {} } = useSelector((state: any) => state.addAgentForm);
  const [agentInfoData, setAgentInfoData] = useState({ ...response });
  const editData = useSelector((state: any) => state.editAgentData) || {};
  const addData = useSelector((state: any) => state.addAgentData) || {};

  useEffect(() => {
    if (editData?.update || addData?.create) {
      dispatch(addAgentRemove());
      navigation.navigate("AgentListing");
      // auth()
      //   .createUserWithEmailAndPassword(agentInfoData?.email, "123456")
      //   .then(async (res: any) => {
      //     console.log("res: IN CREATE", res);
      //     console.log("User account created & signed in!");
      //   });
      ErrorMessage({
        msg: editData?.update
          ? editData?.response?.message
          : addData?.create
            ? addData?.response?.message
            : "",
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editData, addData]);
  const [refraCrtf, setRefraCrtf] = useState(false);
  const [propiderLettr, setPropiderLettr] = useState(false);
  const [cancelcheque, setCancelcheque] = useState(false);
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack();
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    const {
      rera_certificate_no,
      rera_certificate,
      propidership_declaration_letter,
      bank_name,
      branch_name,
      account_no,
      ifsc_code,
      cancel_cheaque,
      norera_register,
    } = agentInfoData;
    if ((rera_certificate_no === "" || rera_certificate_no === undefined)) {
      isError = false;
      errorMessage = strings.reraCertNoReqVal;
      // errorMessage = strings.noReraRegReqVal;
    } else if ((rera_certificate === "" || rera_certificate === undefined)) {
      isError = false;
      errorMessage = strings.reraCertImgReqVal;
      // errorMessage = strings.noReraRegReqVal;
    } 
    // else if (
    //   propidership_declaration_letter === "" ||
    //   propidership_declaration_letter === undefined ||
    //   propidership_declaration_letter === ""
    // ) {
    //   isError = false;
    //   errorMessage = strings.propDeclrLttrImgReqVal;
    // } 
    // else if (norera_register === null) {
    //   isError = false;
    //   errorMessage = strings.noReraRegReqVal;
    // } 
    // else if (bank_name === "" || bank_name === undefined) {
    //   isError = false;
    //   errorMessage = strings.bankNameReqVal;
    // } else if (branch_name === "" || branch_name === undefined) {
    //   isError = false;
    //   errorMessage = strings.branchNameReqVal;
    // } else if (account_no === "" || account_no === undefined) {
    //   isError = false;
    //   errorMessage = strings.accountNoReqVal;
    // } 
    else if (
      account_no !== ""  &&
      Regexs.accountnumRegex.test(account_no) === false
    ) {
      isError = false;
      errorMessage = strings.accountNoValidVal;
    } 
    // else if (ifsc_code === "" || ifsc_code === undefined) {
    //   isError = false;
    //   errorMessage = strings.ifscReqVal;
    // } 
    else if (
      ifsc_code !== "" &&
      Regexs.ifscRegex.test(ifsc_code) === false
    ) {
      isError = false;
      errorMessage = strings.ifscValidVal;
    }
    // else if (cancel_cheaque === "" || cancel_cheaque === undefined) {
    //   isError = false;
    //   errorMessage = strings.cancelChqImgReqVal;
    // }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };
  const onPressCreateAgent = (type: any) => {
    if (validation()) {
      const formData = new FormData();
      if (type === "edit") {
        formData.append("agent_id", agentInfoData?._id);
      } else {
        // formData.append("role_id", agentInfoData?.role_id);
      }
      formData.append("email", agentInfoData?.email ? agentInfoData?.email : "");
      formData.append("agent_name", agentInfoData?.agent_name ? agentInfoData?.agent_name : "");
      formData.append("primary_mobile", agentInfoData?.primary_mobile ? agentInfoData?.primary_mobile : "");
      formData.append("whatsapp_number", agentInfoData?.whatsapp_number ? agentInfoData?.whatsapp_number : "");
      formData.append("adhar_no", agentInfoData?.adhar_no ? agentInfoData?.adhar_no : "");
      formData.append("pancard_no", agentInfoData?.pancard_no ? agentInfoData?.pancard_no : "");
      formData.append("gender", agentInfoData?.gender ? agentInfoData?.gender : "");
      formData.append("bank_name", agentInfoData?.bank_name ? agentInfoData?.bank_name : "");
      formData.append("branch_name", agentInfoData?.branch_name ? agentInfoData?.branch_name : "");
      formData.append("account_no", agentInfoData?.account_no ? agentInfoData?.account_no : ""); 
      formData.append("ifsc_code", agentInfoData?.ifsc_code ? agentInfoData?.ifsc_code : "");
      formData.append("date_of_birth",
        agentInfoData?.date_of_birth ? agentInfoData?.date_of_birth : ""
      );
      formData.append("location", agentInfoData?.location ? agentInfoData?.location : "");
      formData.append("latitude", agentInfoData?.latitude ? agentInfoData?.latitude : "");
      formData.append("longitude", agentInfoData?.longitude ? agentInfoData?.longitude : "");
      formData.append("working_location", agentInfoData?.working_location ? JSON.stringify(agentInfoData?.working_location) : []);
      formData.append("rera_certificate_no", agentInfoData?.rera_certificate_no ? agentInfoData?.rera_certificate_no : "");
      formData.append("rera_certificate", agentInfoData?.rera_certificate)
      agentInfoData?.profile_picture?.uri &&
        formData.append("profile_picture", agentInfoData?.profile_picture);
      agentInfoData?.cancel_cheaque?.uri &&
        formData.append("cancel_cheaque", agentInfoData?.cancel_cheaque);
      agentInfoData?.propidership_declaration_letter?.uri &&
        formData.append(
          "propidership_declaration_letter",
          agentInfoData?.propidership_declaration_letter
        );
      if (type === "edit") {
        dispatch(editAgent(formData));
      } else {
        dispatch(addAgent(formData));
      }
    }
  };
  console.log('agentInfoData.norera_register: ', typeof agentInfoData.norera_register);

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.rerainfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={onPressBack}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.wraptop}>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              require={true}
              placeholderText={strings.reraCertificate + " " + strings.shortNum} //can edit
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  rera_certificate_no: data,
                  norera_register: (data === "" && agentInfoData?.rera_certificate === "" ||
                    agentInfoData?.rera_certificate === null) ? null : ""
                });
              }}
              valueshow={agentInfoData?.rera_certificate_no?.toString()}
              maxLength={20}
              headingText={strings.reraCertificate + " " + strings.shortNum}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row" }]}>
            <View style={styles.flexRowVw}>
              <Text style={[styles.headingText, { fontSize: normalize(17) }]}>
                {strings.reraCertificate}
              </Text>
              {<RequiredStart /> }
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => setRefraCrtf(true)}
                style={styles.browseVw}
              >
                <Text
                  style={{
                    color:
                      agentInfoData?.rera_certificate === ""
                        ? BLACK_COLOR
                        : PRIMARY_THEME_COLOR,
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {agentInfoData?.rera_certificate === null ||
                agentInfoData?.rera_certificate === "" ||
                agentInfoData?.rera_certificate === undefined ? null : (
                <Text style={styles.addedTxt}>{strings.reraCertificate + " " + strings.added}</Text>
              )}
            </View>
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row" }]}>
            <View style={styles.flexRowVw}>
              <Text style={[styles.headingText, { fontSize: normalize(17) }]}>
                {strings.proprietorDeclarLttr}
              </Text>
              {/* <RequiredStart /> */}
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => setPropiderLettr(true)}
                style={styles.browseVw}
              >
                <Text
                  style={{
                    color:
                      agentInfoData?.propidership_declaration_letter === ""
                        ? BLACK_COLOR
                        : PRIMARY_THEME_COLOR,
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {agentInfoData?.propidership_declaration_letter === null ||
                agentInfoData?.propidership_declaration_letter === "" ||
                agentInfoData?.propidership_declaration_letter ===
                undefined ? null : (
                <Text style={styles.addedTxt}>
                  {strings.proprietorDeclarLttr + " " + strings.added}
                </Text>
              )}
            </View>
          </View>
        </View>
        {/* <View style={styles.straightVw}>
          <RadioButton.Android
            value={agentInfoData?.norera_register}
            status={agentInfoData.norera_register === 1 ? "checked" : "unchecked"}
            onPress={() => {
              setAgentInfoData({
                ...agentInfoData,
                norera_register: 1,
                rera_certificate: '',
                rera_certificate_no: '',
              });
            }}
            color={PRIMARY_THEME_COLOR}
          />
          <Text
            style={[
              styles.radioTxt,
              {
                color:
                  agentInfoData.norera_register === 1
                    ? PRIMARY_THEME_COLOR
                    : BLACK_COLOR,
              },
            ]}
          >
            {strings.noReraRegistr}
          </Text>
        </View> */}
        <View style={styles.wrapbottum}>
          <View style={styles.inputWrap}>
            <Text style={styles.headingText}>{strings.bankDetail}</Text>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.bankName}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  bank_name: data,
                });
              }}
              valueshow={agentInfoData?.bank_name?.toString()}
              headingText={strings.bankName}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.branchName}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  branch_name: data,
                });
              }}
              valueshow={agentInfoData?.branch_name?.toString()}
              headingText={strings.branchName}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.accountNo}
              handleInputBtnPress={() => { }}
              maxLength={18}
              keyboardtype={"number-pad"}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  account_no: data,
                });
              }}
              valueshow={agentInfoData?.account_no?.toString()}
              headingText={strings.accountNo}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.ifscCode}
              handleInputBtnPress={() => { }}
              maxLength={11}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  ifsc_code: data,
                });
              }}
              valueshow={agentInfoData?.ifsc_code?.toString()}
              headingText={strings.ifscCode}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row" }]}>
            <View style={styles.flexRowVw}>
              <Text style={[styles.headingText, { fontSize: normalize(17) }]}>
                {strings.cancelCheque}
              </Text>
              {/* <RequiredStart /> */}
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => setCancelcheque(true)}
                style={styles.browseVw}
              >
                <Text
                  style={{
                    color:
                      agentInfoData?.cancel_cheaque === ""
                        ? BLACK_COLOR
                        : PRIMARY_THEME_COLOR,
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {agentInfoData?.cancel_cheaque === null ||
                agentInfoData?.cancel_cheaque === "" ||
                agentInfoData?.cancel_cheaque === undefined ? null : (
                <Text style={styles.addedTxt}>{strings.cancelCheque + " " + strings.added}</Text>
              )}
            </View>
          </View>
          {/* <View style={{marginTop: 20}}>
          <Button
            handleBtnPress={()=>onPressCreateAgent()}
            buttonText={strings.createAgent}
            textTransform={"uppercase"}
          />
        </View> */}

          <View style={{ marginTop: 10 }}>
            <Button
              handleBtnPress={() => {
                Isios && Keyboard.dismiss()
                onPressCreateAgent(route?.params?.type)
              }}
              buttonText={
                route?.params?.type === "edit"
                  ? strings.editAgent
                  : strings.createAgent
              }
              textTransform={"uppercase"}
            />
          </View>
        </View>
        <View style={[styles.bottomView, { alignItems: "center" }]}>
          <CheckBox
            value={true}
            disabled={true}
            tintColors={{ true: PRIMARY_THEME_COLOR }}
            style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://justoverse.com/termandcondition")
            }
            style={styles.spanTouch}
          >
            <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}> {strings.applicable} </Text>
          {/* <TouchableOpacity style={styles.spanTouch}>
            <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
          </TouchableOpacity> */}
        </View>

        <PicturePickerModal
          Visible={refraCrtf}
          docType={"all"}
          setVisible={setRefraCrtf}
          imageData={(data: any) => {
            Keyboard.dismiss()
            setAgentInfoData({
              ...agentInfoData,
              rera_certificate: data,
              norera_register: ''
            });
          }}
        />
        <PicturePickerModal
          Visible={propiderLettr}
          docType={"all"}
          setVisible={setPropiderLettr}
          imageData={(data: any) => {
            Keyboard.dismiss()
            setAgentInfoData({
              ...agentInfoData,
              propidership_declaration_letter: data,
            });
          }}
        />
        <PicturePickerModal
          Visible={cancelcheque}
          docType={"all"}
          setVisible={setCancelcheque}
          imageData={(data: any) => {
            Keyboard.dismiss()
            console.log("data: ", data);
            setAgentInfoData({
              ...agentInfoData,
              cancel_cheaque: data,
            });
          }}
        />
      </ScrollView >
    </View >
  );
};

export default AgentBankInfo;
