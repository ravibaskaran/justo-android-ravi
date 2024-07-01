import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalize } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import { RadioButton } from "react-native-paper";
import { handleValues } from "app/components/utilities/handleValues";
import AddPropertyModel from "app/components/Modals/AddPropertyModel";

const CompanyBankInfo = (props: any) => {
  const [reravisible, setreraVisible] = useState(false);
  const [lettervisible, setletterVisible] = useState(false);
  const [cheaquevisible, setcheaqueVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const renderProperty = (item: any, index: any) => {
    return (
      <View style={styles.propertyTxtview}>
        <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Property {index + 1} :</Text>
          </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.property_title}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.compInformation}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={() => props.setFormType(0)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}
      >
        <Text style={styles.applicableTxt}>{strings.areYouGstAppl}</Text>

        <View style={styles.TypeView}>
          {/* <RequiredStart /> */}
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.agencyData?.gstApplicable}
              status={
                props.agencyData.gstApplicable === 1 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAgencyData({
                  ...props.agencyData,
                  gstApplicable: 1,
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.agencyData.gstApplicable === 1
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.yes}
            </Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.agencyData?.gstApplicable}
              status={
                props.agencyData.gstApplicable === 0 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAgencyData({
                  ...props.agencyData,
                  gstApplicable: 0,
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.agencyData.gstApplicable === 0
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.no}
            </Text>
          </View>
        </View>
        {props.agencyData?.gstApplicable === 1 ? (
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.compGst}
              maxLength={20}
              headingText={strings.compGst}
              handleInputBtnPress={() => {}}
              valueshow={props?.agencyData?.company_gst}
              onChangeText={(val: any) => {
                props.setAgencyData({
                  ...props?.agencyData,
                  company_gst: val,
                });
              }}
            />
          </View>
        ) : (
          <View
            style={[
              styles.inputWrap,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headingText}>{strings.declrLttrCom}</Text>
              {/* <RequiredStart /> */}
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => {
                  setletterVisible(true);
                  setVisible(true);
                }}
              >
                <Text
                  style={{
                    color: props.agencyData?.propidership_declaration_letter
                      ? BLACK_COLOR
                      : PRIMARY_THEME_COLOR,
                    fontSize: normalize(15),
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {props.agencyData?.propidership_declaration_letter === null ||
              props.agencyData?.propidership_declaration_letter === "" ||
              props.agencyData?.propidership_declaration_letter ===
                undefined ? null : (
                <Text style={styles.addedTxt}>
                  {strings.declrLttrCom + " " + strings.added}
                </Text>
              )}
            </View>
          </View>
        )}
        {/* <View style={styles.inputWrap}>
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
                norera_register: (val === "" && handleValues(props?.agencyData?.company_rera_certificate) === false) ? null : ""
              })

            }}
          />
        </View> */}
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headingText}>
              {strings.compReraCertificate}
            </Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setreraVisible(true);
                setVisible(true);
              }}
            >
              <Text
                style={{
                  color: props.agencyData?.company_rera_certificate
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {props.agencyData?.company_rera_certificate === null ||
            props.agencyData?.company_rera_certificate === "" ||
            props.agencyData?.company_rera_certificate === undefined ? null : (
              <Text style={styles.addedTxt}>
                {strings.compReraCertificate + " " + strings.added}
              </Text>
            )}
          </View>
        </View>
        <View
          style={[
            styles.inputWrap,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headingText}>{strings.compPanCard}</Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setletterVisible(true);
                setVisible(true);
              }}
            >
              <Text
                style={{
                  color: props.agencyData?.company_pancard
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {props.agencyData?.company_pancard === null ||
            props.agencyData?.company_pancard === "" ||
            props.agencyData?.company_pancard ===
              undefined ? null : (
              <Text style={styles.addedTxt}>
                {strings.compPanCard + " " + strings.added}
              </Text>
            )}
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
                company_rera_certificate: '',
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
        <View
          style={[
            styles.inputWrap,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headingText}>{strings.allocateProperty}</Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={[
                styles.browseVw,
                {
                  top:
                    props.agencyData?.cancel_cheaque === null ||
                    props.agencyData?.cancel_cheaque === "" ||
                    props.agencyData?.cancel_cheaque === undefined
                      ? normalize(0)
                      : normalize(8),
                },
              ]}
              onPress={() => {
                props.setIsPropertyVisible(true);
              }}
            >
              <Text
                style={{
                  color: PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.add}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.propertyWrap}>
          {props.selectedProperty?.length > 0
            ? props.selectedProperty?.map((prop: any, index: any) => renderProperty(prop, index))
            : <View style={[styles.propertyTxtview, {justifyContent: 'center'}]}>
                <Text style={styles.projectTxt}>{strings.noPropertySelected}</Text>
              </View>}
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>{strings.compBankDetail}</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.bankName}
            handleInputBtnPress={() => {}}
            headingText={strings.bankName}
            valueshow={props.agencyData?.company_bank_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
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
            handleInputBtnPress={() => {}}
            headingText={strings.branchName}
            valueshow={props.agencyData?.company_branch_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
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
            handleInputBtnPress={() => {}}
            headingText={strings.accountNo}
            maxLength={18}
            keyboardtype={"number-pad"}
            valueshow={props.agencyData?.company_account_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
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
            handleInputBtnPress={() => {}}
            headingText={strings.ifscCode}
            valueshow={props.agencyData?.company_ifsc_code}
            maxLength={11}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                company_ifsc_code: val,
              });
            }}
          />
        </View>
        {/* <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.cancelCheque}</Text>
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
        </View> */}
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => {
              props.onPressNext(2, props.agencyData);
            }}
            // rightImage={images.forwardArrow}
            buttonText={props.type === "add"
            ? strings.createnewagency
            : strings.editagency}
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        docType={"all"}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            props.setAgencyData({
              ...props.agencyData,
              company_rera_certificate: data,
              norera_register: "",
            });
            setreraVisible(false);
          } else if (lettervisible) {
            props.setAgencyData({
              ...props.agencyData,
              propidership_declaration_letter: data,
            });
            setletterVisible(false);
          } else {
            props.setAgencyData({
              ...props.agencyData,
              cancel_cheaque: data,
            });
            setcheaqueVisible(false);
          }
        }}
      />
      <AddPropertyModel
        isVisible={props.isPropertyVisible}
        setIsVisible={props.setIsPropertyVisible}
        handleSearch={props.handleSearch}
        finalPropertyList={props.finalPropertyList}
        handleSelects={props.handleSelects}
        handleDelete={props.handleDelete}
        selectedProperty={props.selectedProperty}
        handleAllocateProperty={props.handleAllocateProperty}
      />
    </View>
  );
};

export default CompanyBankInfo;
