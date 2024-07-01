import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { BLACK_COLOR, Isios, PRIMARY_THEME_COLOR, } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalize } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import { RadioButton } from "react-native-paper";
import { handleValues } from "app/components/utilities/handleValues";

const AgentBankInfo = (props: any) => {
  const [reravisible, setreraVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const [cheaquevisible, setcheaqueVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.userbankinfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={() => props.setFormType(0)}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.reraCertificate + " " + strings.shortNum}
            handleInputBtnPress={() => { }}
            headingText={strings.reraCertificate + " " + strings.shortNum}
            maxLength={20}
            valueshow={props.agencyData?.rera_certificate_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                rera_certificate_no: val,
                norera_register: (val === "" && handleValues(props?.agencyData?.rera_certificate) === false) ? null : ""
              })

            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.reraCertificate}</Text>
            <RequiredStart />
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setreraVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{
                color: props.agencyData?.rera_certificate
                  ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15)
              }}>{strings.browse}</Text>
            </TouchableOpacity>
            {props.agencyData?.rera_certificate === null ||
              props.agencyData?.rera_certificate === "" ||
              props.agencyData?.rera_certificate === undefined ?
              null :
              <Text style={styles.addedTxt}>{strings.reraCertificate + " " + strings.added}</Text>
            }
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.proprietorDeclarLttr}</Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setletterVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{
                color: props.agencyData?.propidership_declaration_letter ?
                  BLACK_COLOR : PRIMARY_THEME_COLOR,
                fontSize: normalize(15)
              }}>{strings.browse}</Text>
            </TouchableOpacity>
            {props.agencyData?.propidership_declaration_letter === null ||
              props.agencyData?.propidership_declaration_letter === "" ||
              props.agencyData?.propidership_declaration_letter === undefined ?
              null :
              <Text style={styles.addedTxt}>{strings.proprietorDeclarLttr + " " + strings.added}</Text>
            }
          </View>
        </View>
        {/* <View style={styles.straightVw}>
          <RadioButton.Android
            value={props.agencyData?.norera_register}
            status={props.agencyData.norera_register === 1 ? "checked" : "unchecked"}
            onPress={() => {
              props.setAgencyData({
                ...props.agencyData,
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
                  props.agencyData.norera_register === 1
                    ? PRIMARY_THEME_COLOR
                    : BLACK_COLOR,
              },
            ]}
          > {strings.noReraRegistr} </Text>
        </View> */}
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
            valueshow={props.agencyData?.bank_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, bank_name: val
              })
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
            valueshow={props.agencyData?.branch_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, branch_name: val
              })
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
            maxLength={18}
            keyboardtype={'number-pad'}
            valueshow={props.agencyData?.account_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, account_no: val
              })
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
            valueshow={props.agencyData?.ifsc_code}
            maxLength={11}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData, ifsc_code: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.cancelCheque}</Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={[styles.browseVw, {
                top: props.agencyData?.cancel_cheaque === null ||
                  props.agencyData?.cancel_cheaque === "" ||
                  props.agencyData?.cancel_cheaque === undefined ?
                  normalize(0) : normalize(8),
              }]}
              onPress={() => {
                setcheaqueVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{
                color: props.agencyData?.cancel_cheaque === "" ?
                  BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15)
              }}>{strings.browse}</Text>
            </TouchableOpacity>
            {props.agencyData?.cancel_cheaque === null ||
              props.agencyData?.cancel_cheaque === "" ||
              props.agencyData?.cancel_cheaque === undefined ?
              null :
              <Text style={styles.addedTxt}>{
                strings.cancelCheque + " " + strings.added}</Text>
            }
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => {
              props.onPressNext(2, props.agencyData)
            }}
            rightImage={images.forwardArrow}
            buttonText={strings.next}
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        docType={'all'}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            props.setAgencyData({
              ...props.agencyData, rera_certificate: data,
              norera_register: "",
            })
            setreraVisible(false)
          }
          else if (lettervisible) {
            props.setAgencyData({
              ...props.agencyData, propidership_declaration_letter: data
            })
            setletterVisible(false)
          }
          else {
            props.setAgencyData({
              ...props.agencyData, cancel_cheaque: data
            })
            setcheaqueVisible(false)
          }
        }}
      />
    </View>
  );
};

export default AgentBankInfo;
