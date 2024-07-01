import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import { normalize, } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import ErrorMessage from "app/components/ErrorMessage";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import CheckBox from "@react-native-community/checkbox";

const CompanyDetails = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [docType, setDocType] = useState('')
  const [panvisible, setpanVisible] = useState(false);
  const [lettervisible, setletterVisible] = useState(false);

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.companyDetails}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={() => props.setFormType(1)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.agency + " " + strings.name}
            handleInputBtnPress={() => { }}
            headingText={strings.realEstateCom}
            valueshow={props?.agencyData?.agency_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                agency_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.gst}
            maxLength={20}
            headingText={strings.gst}
            handleInputBtnPress={() => { }}
            valueshow={props?.agencyData?.gst}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                gst: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.RERA + " " + strings.registration}
            headingText={strings.RERA + " " + strings.registration}
            maxLength={20}
            handleInputBtnPress={() => { }}
            valueshow={props?.agencyData?.rera_registration}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                rera_registration: val,
              });
            }}
          />
        </View>
        <View
          style={[
            styles.inputWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.pancard}</Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setpanVisible(true);
                setVisible(true);
                setDocType('')
              }}
            >
              <Text
                style={{
                  color: props?.agencyData?.pancard
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {props.agencyData?.pancard === null ||
              props.agencyData?.pancard === "" ||
              props.agencyData?.pancard === undefined ?
              null :
              <Text style={styles.addedTxt}>{strings.pancard + " " + strings.added}</Text>
            }
          </View>
        </View>
        <View
          style={[
            styles.inputWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headingText}>
              {strings.declrLttrCom}
            </Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setletterVisible(true);
                setVisible(true);
                setDocType('all')
              }}
            >
              <Text
                style={{
                  color: props?.agencyData?.declaration_letter_of_company
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {props.agencyData?.declaration_letter_of_company === null ||
              props.agencyData?.declaration_letter_of_company === "" ||
              props.agencyData?.declaration_letter_of_company === undefined ?
              null :
              <Text style={styles.addedTxt}>{strings.declrLttrCom + " " + strings.added}</Text>
            }
          </View>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>{strings.bankDetail}</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.bankName}
            handleInputBtnPress={() => { }}
            headingText={strings.bankName}
            valueshow={props?.agencyData?.company_bank_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_bank_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.branchName}
            handleInputBtnPress={() => { }}
            headingText={strings.branchName}
            valueshow={props?.agencyData?.company_branch_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_branch_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.accountNo}
            handleInputBtnPress={() => { }}
            headingText={strings.accountNo}
            keyboardtype={"number-pad"}
            valueshow={props?.agencyData?.company_account_no}
            maxLength={18}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_account_no: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.ifscCode}
            handleInputBtnPress={() => { }}
            headingText={strings.ifscCode}
            maxLength={11}
            valueshow={props?.agencyData?.company_ifsc_code}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props?.agencyData,
                company_ifsc_code: val,
              });
            }}
          />
        </View>
        <View style={styles.bottomView}>
          <CheckBox
            value={true}
            disabled={true}
            tintColors={{ true: PRIMARY_THEME_COLOR }}
            style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]  : [{ scaleX: 1 }, { scaleY: 1 }]}}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://justoverse.com/termandcondition')} style={styles.spanTouch}>
            <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}> {strings.applicable} </Text>
          {/* <TouchableOpacity style={styles.spanTouch}>
                    <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
                    </TouchableOpacity> */}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={() => {
              if (validation()) {
                props.onPressNext(3, props?.agencyData);
              }
            }}
            buttonText={
              props.type === "add"
                ? strings.createnewagency
                : strings.editagency
            }
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        docType={docType}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (panvisible) {
            props.setAgencyData({
              ...props?.agencyData,
              pancard: data,
            });
            setpanVisible(false);
          } else {
            props.setAgencyData({
              ...props?.agencyData,
              declaration_letter_of_company: data,
            });
            setletterVisible(false);
          }
        }}
      />
    </View>
  );
};

export default CompanyDetails;
